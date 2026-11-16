// Cliente de la API REST. Todas las páginas piden sus datos a través de obtener().
//
// Qué resuelve este archivo:
//  - Errores claros: clasifica cada falla (sin conexión, tiempo agotado, 404, 500...).
//  - Eficiencia: guarda las respuestas en memoria (caché) y evita pedir dos veces lo mismo.
//  - Carga: avisa a la interfaz cuando una petición empieza y termina.
//  - Respaldo: guarda la última respuesta buena para poder mostrarla si el servidor falla.
import { peticionIniciada, peticionTerminada } from './estadoCarga.js'

const URL_BASE = `${import.meta.env.BASE_URL}api`
const TIEMPO_MAXIMO = 8000 // ms: si el servidor no responde en 8 s, se corta la petición
const VIGENCIA_CACHE = 5 * 60 * 1000 // 5 minutos

// ---------------------------------------------------------------- errores
export class ErrorApi extends Error {
  constructor(tipo, estado, mensaje) {
    super(mensaje)
    this.tipo = tipo // 'red' | 'tiempo' | 'no-encontrado' | 'servidor' | 'cliente' | 'respuesta'
    this.estado = estado // código HTTP (si hubo respuesta)
  }

  // ¿Tiene sentido mostrar datos guardados y reintentar? Un 404 no se arregla reintentando.
  get recuperable() {
    return ['red', 'tiempo', 'servidor'].includes(this.tipo)
  }
}

function errorPorEstado(estado) {
  if (estado === 404) return new ErrorApi('no-encontrado', 404, 'El recurso pedido no existe.')
  if (estado >= 500) return new ErrorApi('servidor', estado, `El servidor tuvo un problema (error ${estado}).`)
  return new ErrorApi('cliente', estado, `No se pudo completar la petición (error ${estado}).`)
}

// ---------------------------------------------------------------- caché
const cache = new Map() // ruta -> { datos, guardado }
const enCurso = new Map() // ruta -> promesa de una petición que aún no termina

const CLAVE_RESPALDO = 'libreria:respaldo:'

function guardarRespaldo(ruta, datos) {
  try {
    localStorage.setItem(CLAVE_RESPALDO + ruta, JSON.stringify(datos))
  } catch {
    /* si no hay almacenamiento, simplemente no hay respaldo */
  }
}

export function leerRespaldo(ruta) {
  try {
    const texto = localStorage.getItem(CLAVE_RESPALDO + ruta)
    return texto ? JSON.parse(texto) : null
  } catch {
    return null
  }
}

// ---------------------------------------------------------------- petición
async function pedir(ruta) {
  const controlador = new AbortController()
  const temporizador = setTimeout(() => controlador.abort(), TIEMPO_MAXIMO)
  try {
    const respuesta = await fetch(`${URL_BASE}${ruta}`, { signal: controlador.signal })
    if (!respuesta.ok) throw errorPorEstado(respuesta.status)
    try {
      return await respuesta.json()
    } catch {
      throw new ErrorApi('respuesta', respuesta.status, 'El servidor respondió con datos que no se pueden leer.')
    }
  } catch (error) {
    if (error instanceof ErrorApi) throw error
    if (error.name === 'AbortError') {
      throw new ErrorApi('tiempo', null, 'El servidor tardó demasiado en responder.')
    }
    throw new ErrorApi('red', null, 'No se pudo conectar con el servidor.')
  } finally {
    clearTimeout(temporizador)
  }
}

// Pide un recurso (por ejemplo "/categorias").
// - Si ya está en caché y vigente, responde al instante sin tocar la red.
// - Si ya hay una petición idéntica en curso, comparte esa misma (no se repite).
// - forzar: true se salta el caché (lo usa el botón "Reintentar").
export function obtener(ruta, { forzar = false } = {}) {
  const guardado = cache.get(ruta)
  if (!forzar && guardado && Date.now() - guardado.guardado < VIGENCIA_CACHE) {
    return Promise.resolve(guardado.datos)
  }
  if (enCurso.has(ruta)) return enCurso.get(ruta)

  peticionIniciada()
  const promesa = pedir(ruta)
    .then((datos) => {
      cache.set(ruta, { datos, guardado: Date.now() })
      guardarRespaldo(ruta, datos)
      return datos
    })
    .finally(() => {
      enCurso.delete(ruta)
      peticionTerminada()
    })
  enCurso.set(ruta, promesa)
  return promesa
}

// Funciones concretas de la API: las páginas usan estas rutas.
export const rutas = {
  categorias: '/categorias',
  categoria: (id) => `/categorias/${encodeURIComponent(id)}`,
}

// Borra los datos guardados como respaldo (se usa en el panel de pruebas para
// comprobar qué ocurre cuando el servidor falla y NO hay nada guardado).
export function borrarRespaldos() {
  try {
    Object.keys(localStorage)
      .filter((clave) => clave.startsWith(CLAVE_RESPALDO))
      .forEach((clave) => localStorage.removeItem(clave))
  } catch {
    /* sin almacenamiento no hay nada que borrar */
  }
}
