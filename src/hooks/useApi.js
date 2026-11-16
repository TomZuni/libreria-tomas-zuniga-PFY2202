// Hook para pedir datos a la API desde un componente.
//   const { datos, cargando, error, desdeRespaldo, reintentar } = useApi('/categorias')
//
// - cargando: true mientras se espera la respuesta.
// - error: un ErrorApi si la petición falló y no hay datos que mostrar.
// - desdeRespaldo: true si la petición falló pero se muestran los últimos datos guardados.
// - reintentar(): vuelve a pedir los datos saltándose el caché.
import { useCallback, useEffect, useState } from 'react'
import { obtener, leerCache, leerRespaldo } from '../servicios/api.js'

const SIN_RESPUESTA = { ruta: null, datos: null, error: null, desdeRespaldo: false, reintentando: false }

export default function useApi(ruta) {
  const [intento, setIntento] = useState(0)
  const [estado, setEstado] = useState(SIN_RESPUESTA)

  useEffect(() => {
    let activo = true // evita actualizar el estado si el componente ya cambió de ruta o se desmontó

    obtener(ruta, { forzar: intento > 0 }).then(
      (datos) => {
        if (activo) setEstado({ ruta, datos, error: null, desdeRespaldo: false, reintentando: false })
      },
      (error) => {
        if (!activo) return
        // Solución alternativa: si el fallo es de conexión o del servidor, se muestran los últimos datos guardados.
        const respaldo = error.recuperable ? leerRespaldo(ruta) : null
        setEstado({ ruta, datos: respaldo, error, desdeRespaldo: respaldo !== null, reintentando: false })
      },
    )
    return () => {
      activo = false
    }
  }, [ruta, intento])

  const reintentar = useCallback(() => {
    setEstado({ ...SIN_RESPUESTA, reintentando: true })
    setIntento((n) => n + 1)
  }, [])

  // Si el estado guardado es de otra ruta, todavía no llegó la respuesta de esta.
  if (estado.ruta !== ruta) {
    // Si los datos ya están en caché se muestran de inmediato, sin parpadeo de "cargando".
    const enCache = estado.reintentando ? undefined : leerCache(ruta)
    if (enCache !== undefined) {
      return { datos: enCache, error: null, desdeRespaldo: false, cargando: false, reintentar }
    }
    return { datos: null, error: null, desdeRespaldo: false, cargando: true, reintentar }
  }
  return {
    datos: estado.datos,
    error: estado.error,
    desdeRespaldo: estado.desdeRespaldo,
    cargando: false,
    reintentar,
  }
}
