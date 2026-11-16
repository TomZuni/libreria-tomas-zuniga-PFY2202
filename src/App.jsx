// Rutas de la aplicación (React Router):
//   /                 -> Inicio
//   /categorias       -> Listado de categorías (GET /api/categorias)
//   /categorias/:id   -> Libros de una categoría (GET /api/categorias/:id)
//   *                 -> Página no encontrada
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Inicio from './pages/Inicio.jsx'
import Categorias from './pages/Categorias.jsx'
import DetalleCategoria from './pages/DetalleCategoria.jsx'
import NoEncontrada from './pages/NoEncontrada.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="categorias" element={<Categorias />} />
        <Route path="categorias/:id" element={<DetalleCategoria />} />
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  )
}
