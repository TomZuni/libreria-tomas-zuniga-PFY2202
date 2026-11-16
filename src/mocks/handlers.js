// API REST mock. Se simula un servidor con MSW (Mock Service Worker): intercepta
// las peticiones fetch del navegador y responde como lo haría un backend real,
// con códigos HTTP (200, 404, 500) y JSON.
//
//   GET /api/categorias       -> lista de categorías (con la cantidad de libros)
//   GET /api/categorias/:id   -> una categoría con sus libros (404 si no existe)
import { http, HttpResponse, delay } from 'msw'
import { CATEGORIAS, LIBROS } from './datos.js'
import { leerModo } from './modo.js'

const LATENCIA = 700 // milisegundos: simula el tiempo de un servidor real

// Aplica el modo de pruebas elegido. Devuelve una respuesta si debe fallar, o null si todo sigue normal.
async function simularEstadoDelServidor() {
  const modo = leerModo()
  if (modo === 'lento') await delay(4000)
  else if (modo === 'colgado') await delay('infinite')
  else await delay(LATENCIA)

  if (modo === 'error500') {
    return HttpResponse.json({ mensaje: 'Error interno del servidor' }, { status: 500 })
  }
  if (modo === 'sinConexion') return HttpResponse.error()
  return null
}

export const handlers = [
  http.get('*/api/categorias', async () => {
    const falla = await simularEstadoDelServidor()
    if (falla) return falla

    const categorias = CATEGORIAS.map((c) => ({
      ...c,
      cantidadLibros: LIBROS.filter((l) => l.categoriaId === c.id).length,
    }))
    return HttpResponse.json(categorias)
  }),

  http.get('*/api/categorias/:id', async ({ params }) => {
    const falla = await simularEstadoDelServidor()
    if (falla) return falla

    const categoria = CATEGORIAS.find((c) => String(c.id) === params.id)
    if (!categoria) {
      return HttpResponse.json({ mensaje: `La categoría ${params.id} no existe` }, { status: 404 })
    }
    const libros = LIBROS.filter((l) => l.categoriaId === categoria.id)
    return HttpResponse.json({ ...categoria, cantidadLibros: libros.length, libros })
  }),
]
