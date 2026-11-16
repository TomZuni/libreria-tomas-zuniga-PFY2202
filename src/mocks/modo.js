// Modo de funcionamiento del servidor mock. Sirve para PROBAR cómo reacciona
// la aplicación cuando el servidor falla, sin tener que romper nada de verdad.
// Se guarda en localStorage y lo cambia el "Panel de pruebas" del pie de página.

export const MODOS = [
  { id: 'normal', texto: 'Normal', detalle: 'El servidor responde bien (con una pequeña demora).' },
  { id: 'lento', texto: 'Lento (4 s)', detalle: 'Cada respuesta demora 4 segundos.' },
  { id: 'error500', texto: 'Error 500', detalle: 'El servidor responde con un error interno.' },
  { id: 'sinConexion', texto: 'Sin conexión', detalle: 'La petición falla como si no hubiera internet.' },
  { id: 'colgado', texto: 'No responde', detalle: 'El servidor nunca responde (se activa el tiempo máximo de espera).' },
]

const CLAVE = 'libreria:modo-mock'

export function leerModo() {
  try {
    const modo = localStorage.getItem(CLAVE)
    return MODOS.some((m) => m.id === modo) ? modo : 'normal'
  } catch {
    return 'normal'
  }
}

export function guardarModo(modo) {
  try {
    localStorage.setItem(CLAVE, modo)
  } catch {
    /* sin almacenamiento: se queda en modo normal */
  }
}
