// Estructura común de todas las páginas: encabezado, menú, contenido (<Outlet />) y pie.
import { useEffect } from 'react'
import { Outlet, NavLink, Link, useLocation, matchPath } from 'react-router-dom'
import IndicadorCarga from './IndicadorCarga.jsx'
import PanelPruebas from './PanelPruebas.jsx'

const TITULOS = { '/': 'Inicio', '/categorias': 'Categorías' }

const claseEnlace = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
    isActive ? 'bg-white text-tinta-900' : 'text-tinta-100 hover:bg-tinta-700'
  }`

export default function Layout() {
  const { pathname } = useLocation()

  // Al cambiar de página: subir al inicio y actualizar el título de la pestaña.
  useEffect(() => {
    window.scrollTo(0, 0)
    const titulo = matchPath('/categorias/:id', pathname) ? 'Libros de la categoría' : (TITULOS[pathname] ?? 'Página no encontrada')
    document.title = `${titulo} | Librería Páginas`
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-tinta-900 text-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-3">
          <Link to="/" className="flex items-center gap-2 text-lg font-extrabold">
            <span aria-hidden="true">📚</span> Librería Páginas
          </Link>
          <nav aria-label="Navegación principal" className="flex gap-1">
            <NavLink to="/" end className={claseEnlace}>Inicio</NavLink>
            <NavLink to="/categorias" className={claseEnlace}>Categorías</NavLink>
          </nav>
        </div>
        <IndicadorCarga />
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <Outlet />
      </main>

      <footer className="mx-auto w-full max-w-5xl px-4 pb-8">
        <PanelPruebas />
        <p className="mt-4 text-center text-sm text-tinta-700">
          Librería Páginas · Proyecto de Desarrollo Frontend II (PFY2202) · Datos entregados por una API REST mock
        </p>
      </footer>
    </div>
  )
}
