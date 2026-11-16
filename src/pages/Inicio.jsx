// Página de inicio: presentación y algunas categorías destacadas.
// Usa la misma petición que la página Categorías: gracias al caché, ir de una a otra no vuelve a pedir los datos.
import { Link } from 'react-router-dom'
import useApi from '../hooks/useApi.js'
import { rutas } from '../servicios/api.js'
import Peticion from '../components/Peticion.jsx'
import TarjetaCategoria from '../components/TarjetaCategoria.jsx'
import { boton } from '../estilos.js'

export default function Inicio() {
  const api = useApi(rutas.categorias)

  return (
    <>
      <section className="rounded-3xl bg-tinta-900 px-6 py-12 text-center text-white sm:py-16" aria-labelledby="tituloInicio">
        <p className="text-5xl" aria-hidden="true">📚</p>
        <h1 id="tituloInicio" className="mt-3 text-3xl font-extrabold sm:text-4xl">Encuentra tu próxima lectura</h1>
        <p className="mx-auto mt-3 max-w-xl text-tinta-100">
          Explora nuestras categorías de libros: desde clásicos de la ficción hasta la historia de la humanidad.
        </p>
        <Link to="/categorias" className={`${boton} mt-6 !bg-acento-500 hover:!bg-acento-600`}>
          Ver todas las categorías
        </Link>
      </section>

      <section className="mt-10" aria-labelledby="tituloDestacadas">
        <h2 id="tituloDestacadas" className="mb-4 text-2xl font-bold">Categorías destacadas</h2>
        <Peticion api={api} textoCarga="Cargando categorías..." cantidadEsqueletos={3} alternativas={[{ a: '/categorias', texto: 'Ir a categorías' }]}>
          {(categorias) => (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categorias.slice(0, 3).map((categoria) => (
                <TarjetaCategoria key={categoria.id} categoria={categoria} />
              ))}
            </div>
          )}
        </Peticion>
      </section>
    </>
  )
}
