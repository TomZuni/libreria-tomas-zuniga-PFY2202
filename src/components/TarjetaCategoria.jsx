// Tarjeta de una categoría: enlaza a su página con los libros.
import { Link } from 'react-router-dom'
import { tarjeta } from '../estilos.js'

export default function TarjetaCategoria({ categoria }) {
  return (
    <Link
      to={`/categorias/${categoria.id}`}
      className={`${tarjeta} group block transition hover:-translate-y-0.5 hover:border-acento-500 hover:shadow-md focus-visible:outline-2 focus-visible:outline-acento-500`}
    >
      <span className="text-4xl" aria-hidden="true">{categoria.icono}</span>
      <h3 className="mt-3 text-lg font-bold group-hover:text-acento-600">{categoria.nombre}</h3>
      <p className="mt-1 text-sm text-tinta-700">{categoria.descripcion}</p>
      <p className="mt-3 text-sm font-semibold text-acento-600">
        {categoria.cantidadLibros === 0
          ? 'Próximamente'
          : `${categoria.cantidadLibros} ${categoria.cantidadLibros === 1 ? 'libro' : 'libros'}`}
      </p>
    </Link>
  )
}
