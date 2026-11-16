// Página que lista todas las categorías de libros pidiéndolas a la API REST (GET /api/categorias).
import useApi from '../hooks/useApi.js'
import { rutas } from '../servicios/api.js'
import Peticion from '../components/Peticion.jsx'
import TarjetaCategoria from '../components/TarjetaCategoria.jsx'
import EstadoVacio from '../components/EstadoVacio.jsx'

export default function Categorias() {
  const api = useApi(rutas.categorias)

  return (
    <section aria-labelledby="tituloCategorias">
      <h1 id="tituloCategorias" className="text-2xl font-bold">Categorías de libros</h1>
      <p className="mt-1 mb-6 text-tinta-700">Elige una categoría para ver sus libros.</p>

      <Peticion api={api} textoCarga="Cargando categorías..." alternativas={[{ a: '/', texto: 'Volver al inicio' }]}>
        {(categorias) =>
          categorias.length === 0 ? (
            <EstadoVacio titulo="Aún no hay categorías" texto="Vuelve pronto: estamos preparando el catálogo." />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categorias.map((categoria) => (
                <TarjetaCategoria key={categoria.id} categoria={categoria} />
              ))}
            </div>
          )
        }
      </Peticion>
    </section>
  )
}
