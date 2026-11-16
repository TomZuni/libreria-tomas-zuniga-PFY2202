// Ruta comodín (*): se muestra cuando la dirección no existe.
import { Link } from 'react-router-dom'
import EstadoVacio from '../components/EstadoVacio.jsx'
import { boton } from '../estilos.js'

export default function NoEncontrada() {
  return (
    <EstadoVacio icono="🧭" titulo="Página no encontrada" texto="La dirección que escribiste no existe en la librería.">
      <Link to="/" className={boton}>Volver al inicio</Link>
    </EstadoVacio>
  )
}
