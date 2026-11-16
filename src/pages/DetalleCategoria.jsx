// Página de una categoría (ruta /categorias/:id): pide UNA sola vez la categoría con sus libros
// (GET /api/categorias/:id). El buscador filtra los libros que ya llegaron, sin hacer más peticiones.
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useApi from '../hooks/useApi.js'
import { rutas } from '../servicios/api.js'
import Peticion from '../components/Peticion.jsx'
import TarjetaLibro from '../components/TarjetaLibro.jsx'
import EstadoVacio from '../components/EstadoVacio.jsx'
import { botonSecundario } from '../estilos.js'

function ListaLibros({ categoria }) {
  const [busqueda, setBusqueda] = useState('')
  const texto = busqueda.trim().toLowerCase()
  const libros = categoria.libros.filter(
    (libro) => libro.titulo.toLowerCase().includes(texto) || libro.autor.toLowerCase().includes(texto),
  )

  return (
    <>
      <header className="mb-6">
        <p className="text-4xl" aria-hidden="true">{categoria.icono}</p>
        <h1 id="tituloCategoria" className="text-2xl font-bold">{categoria.nombre}</h1>
        <p className="text-tinta-700">{categoria.descripcion}</p>
      </header>

      {/* Renderizado condicional: sin libros, o libros que se pueden buscar */}
      {categoria.libros.length === 0 ? (
        <EstadoVacio icono="🕰️" titulo="Todavía no hay libros aquí" texto="Esta categoría está en preparación. Mira las otras categorías mientras tanto.">
          <Link to="/categorias" className={botonSecundario}>Ver otras categorías</Link>
        </EstadoVacio>
      ) : (
        <>
          <label htmlFor="busqueda" className="sr-only">Buscar por título o autor</label>
          <input
            id="busqueda"
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por título o autor..."
            className="mb-2 w-full rounded-lg border border-tinta-100 bg-white px-3 py-2 outline-none focus:border-acento-500 focus:ring-2 focus:ring-acento-500/30"
          />
          <p className="mb-4 text-sm text-tinta-700" aria-live="polite">
            Mostrando {libros.length} de {categoria.libros.length} libros
          </p>
          {libros.length === 0 ? (
            <EstadoVacio icono="🔎" titulo="Sin resultados" texto={`Ningún libro coincide con “${busqueda}”.`} />
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {libros.map((libro) => (
                <TarjetaLibro key={libro.id} libro={libro} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  )
}

export default function DetalleCategoria() {
  const { id } = useParams()
  const api = useApi(rutas.categoria(id))

  return (
    <section aria-labelledby="tituloCategoria">
      <Link to="/categorias" className="mb-4 inline-block text-sm font-semibold text-acento-600 hover:underline">
        ← Volver a las categorías
      </Link>
      <Peticion
        api={api}
        textoCarga="Cargando libros..."
        cantidadEsqueletos={4}
        alternativas={[{ a: '/categorias', texto: 'Ver todas las categorías' }]}
      >
        {(categoria) => <ListaLibros key={categoria.id} categoria={categoria} />}
      </Peticion>
    </section>
  )
}
