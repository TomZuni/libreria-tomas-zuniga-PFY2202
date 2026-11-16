// Punto de entrada. Primero se enciende el servidor mock y luego se dibuja la aplicación,
// para que ninguna petición salga antes de que la API falsa esté lista.
// HashRouter usa rutas con "#", así el sitio funciona en GitHub Pages aunque se recargue la página.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/app.css'

// import() carga el servidor mock en un archivo aparte, así el código de la tienda queda liviano.
import('./mocks/browser.js').then(({ iniciarMock }) => iniciarMock()).then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </StrictMode>,
  )
})
