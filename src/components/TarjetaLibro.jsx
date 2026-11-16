// Tarjeta de un libro. La "portada" es un bloque de color distinto para cada libro.
import { formatoPrecio } from '../utils.js'
import { tarjeta } from '../estilos.js'

export default function TarjetaLibro({ libro }) {
  const tono = (libro.id * 47) % 360 // cada libro obtiene un color propio

  return (
    <article className={`${tarjeta} flex gap-4`}>
      <div
        className="flex h-32 w-24 shrink-0 items-end rounded-lg p-2 text-xs font-bold leading-tight text-white shadow-inner"
        style={{ background: `linear-gradient(160deg, hsl(${tono} 40% 38%), hsl(${tono} 45% 22%))` }}
        aria-hidden="true"
      >
        {libro.titulo}
      </div>
      <div className="min-w-0">
        <h3 className="font-bold leading-snug">{libro.titulo}</h3>
        <p className="text-sm text-tinta-700">{libro.autor} · {libro.anio}</p>
        <p className="mt-1 text-sm text-tinta-700">{libro.descripcion}</p>
        <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-bold text-acento-600">{formatoPrecio(libro.precio)}</span>
          <span className="text-xs text-tinta-700">{libro.paginas} páginas</span>
          <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${libro.disponible ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}`}>
            {libro.disponible ? 'Disponible' : 'Agotado'}
          </span>
        </p>
      </div>
    </article>
  )
}
