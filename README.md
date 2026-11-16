# Librería Páginas – Tienda de libros con API REST mock

- **Curso:** Desarrollo Frontend II (PFY2202) · Duoc UC
- **Actividad:** Semana 4 – "Utilizando tecnologías de integración entre frontend y backend"
- **Alumno:** Tomás Zúñiga
- **Repositorio:** `libreria-tomas-zuniga-PFY2202`

Aplicación web de una tienda de libros hecha con **React**, **React Router** y **Tailwind CSS**. Los usuarios exploran categorías de libros (Ficción, Ciencia Ficción, Fantasía...) y ven los libros de cada una. Los datos **no están escritos en los componentes**: se piden por `fetch` a una **API REST mock**.

## Páginas y rutas

| Ruta | Página | Qué hace |
|---|---|---|
| `/` | **Inicio** | Presentación y 3 categorías destacadas (datos de la API). |
| `/categorias` | **Categorías** | Lista todas las categorías (`GET /api/categorias`). |
| `/categorias/:id` | **Libros de la categoría** | Muestra la categoría y sus libros (`GET /api/categorias/:id`), con buscador. |
| cualquier otra | **Página no encontrada** | Mensaje con enlace al inicio. |

La navegación usa `HashRouter` (rutas con `#`), de modo que el sitio funciona al recargar en GitHub Pages.

## API REST mock

El servidor falso se hace con **MSW (Mock Service Worker)**: intercepta las peticiones `fetch` del navegador y responde como un backend real, con **códigos HTTP y JSON**. Así la aplicación usa `fetch` normal, y funciona sin instalar ni levantar ningún servidor aparte (también en GitHub Pages).

| Método | Ruta | Respuesta |
|---|---|---|
| `GET` | `/api/categorias` | `200` con la lista de categorías y la cantidad de libros de cada una. |
| `GET` | `/api/categorias/:id` | `200` con la categoría y su arreglo `libros`; `404` si la categoría no existe. |

- Los datos están en `src/mocks/datos.js` (7 categorías y 27 libros) y las rutas en `src/mocks/handlers.js`.
- Cada respuesta demora unos 700 ms para simular un servidor real y poder ver los indicadores de carga.

### Panel de pruebas

En el pie de página hay un **Panel de pruebas del servidor mock** para comprobar cómo reacciona la aplicación cuando algo falla. Al elegir una opción la página se recarga:

| Opción | Qué simula |
|---|---|
| Normal | El servidor responde bien. |
| Lento (4 s) | Cada respuesta demora 4 segundos (se ve el indicador de carga). |
| Error 500 | El servidor responde con un error interno. |
| Sin conexión | La petición falla como si no hubiera internet. |
| No responde | El servidor nunca responde: a los 8 segundos se corta la espera. |

El botón **Borrar datos guardados** elimina el respaldo (ver más abajo) para ver el error sin datos de reserva. Para probar un **404** basta abrir `#/categorias/999`.

## Cómo está resuelto cada punto de la pauta

### 1. Integración del mock REST
- `src/servicios/api.js` es el único lugar que hace `fetch`; las páginas piden datos con el hook `useApi` (`src/hooks/useApi.js`).
- El componente `Peticion` recibe el resultado del hook y dibuja el estado (cargando, error, aviso o datos), así cada página solo define cómo se ven los datos.
- Se manejan los casos de éxito, categoría sin libros (estado vacío), búsqueda sin resultados y ruta inexistente.

### 2. Manejo de errores en las peticiones
- Cada falla se clasifica en un `ErrorApi` con un tipo: **sin conexión**, **tiempo agotado**, **404**, **error del servidor (5xx)** o respuesta ilegible.
- `MensajeError` muestra un título y una explicación distinta para cada tipo, con el código de respuesta si existe.
- **Soluciones alternativas** para el usuario: botón **Reintentar** (no aparece en un 404, porque no serviría), enlaces para ir a otra parte del sitio y, si ya se habían cargado datos antes, se muestran **los últimos datos guardados** en el equipo con un aviso (`AvisoRespaldo`).

### 3. Control de carga y estado de las peticiones
- **Indicador por sección** (`Cargando`): ruedita, texto ("Cargando categorías...", "Cargando libros...") y esqueletos que anticipan el contenido. Se retira al llegar los datos o el error.
- **Indicador global** (`IndicadorCarga`): barra bajo el encabezado que se mueve mientras haya **cualquier** petición en curso. Usa un contador de peticiones (`src/servicios/estadoCarga.js`) leído con `useSyncExternalStore`.
- Tiempo máximo de espera de 8 segundos (`AbortController`): si el servidor no responde, la carga termina con un mensaje en vez de quedar pegada.
- Al **Reintentar** se vuelve a mostrar la carga.

### 4. Optimización y eficiencia en la consulta de datos
- **Caché en memoria** (5 minutos): volver a una página ya visitada muestra los datos al instante, sin pedirlos de nuevo ni mostrar "cargando".
- **Peticiones compartidas:** *Inicio* y *Categorías* usan la misma consulta, por lo que ir de una a otra hace una sola petición. Si dos componentes piden lo mismo a la vez, se comparte la misma petición.
- **Carga bajo demanda:** los libros de una categoría solo se piden al entrar a ella, y en una sola petición (la categoría ya trae sus libros).
- El **buscador filtra los datos que ya llegaron**, sin nuevas peticiones.
- Con `useEffect` se evita actualizar el estado cuando el usuario ya cambió de página.

## Estructura del proyecto

```
.
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── mockServiceWorker.js         Archivo del servidor mock (lo genera MSW)
└── src/
    ├── main.jsx                     Enciende el mock, luego dibuja la app (HashRouter)
    ├── App.jsx                      Rutas
    ├── estilos.js                   Clases de Tailwind reutilizables
    ├── utils.js                     Formato de precio
    ├── mocks/
    │   ├── datos.js                 Categorías y libros
    │   ├── handlers.js              Endpoints de la API REST mock
    │   ├── modo.js                  Modos de prueba (error 500, lento...)
    │   └── browser.js               Arranque del servidor mock
    ├── servicios/
    │   ├── api.js                   fetch, errores, caché y respaldo
    │   └── estadoCarga.js           Contador de peticiones en curso
    ├── hooks/
    │   ├── useApi.js                Pide datos y entrega estado (carga/error/datos)
    │   └── useCargaGlobal.js        Lee cuántas peticiones hay en curso
    ├── components/
    │   ├── Layout.jsx               Encabezado, menú, <Outlet /> y pie
    │   ├── IndicadorCarga.jsx       Barra de carga global
    │   ├── Cargando.jsx             Carga por sección
    │   ├── MensajeError.jsx         Errores con alternativas
    │   ├── AvisoRespaldo.jsx        Aviso de datos guardados
    │   ├── Peticion.jsx             Decide qué mostrar según el estado
    │   ├── TarjetaCategoria.jsx
    │   ├── TarjetaLibro.jsx
    │   ├── EstadoVacio.jsx
    │   └── PanelPruebas.jsx         Panel para simular fallas
    ├── pages/
    │   ├── Inicio.jsx
    │   ├── Categorias.jsx
    │   ├── DetalleCategoria.jsx
    │   └── NoEncontrada.jsx
    └── styles/
        └── app.css                  Tailwind y colores
```

## Cómo probar

1. Abre **Categorías**: verás el indicador de carga y luego las 7 categorías.
2. Entra a **Ficción** y usa el buscador. Vuelve y reabre la categoría: aparece al instante (caché).
3. Abre **Novedades**: categoría sin libros (estado vacío).
4. Escribe `#/categorias/999` en la dirección: error 404 con mensaje claro.
5. En el **Panel de pruebas** elige **Error 500**: con datos ya cargados antes se muestran los guardados con un aviso; pulsa **Borrar datos guardados** para ver el mensaje de error con el botón **Reintentar**.
6. Elige **Lento (4 s)** para ver con calma los indicadores de carga, y **No responde** para ver el tiempo máximo de espera.

## Instalación y uso

Requiere [Node.js](https://nodejs.org) 18 o superior.

```bash
npm install        # instala las dependencias
npm run dev        # modo desarrollo en http://localhost:5173
npm run build      # genera la carpeta dist para producción
npm run preview    # prueba la versión de producción
```


## Tecnologías

React 19 · React Router 7 · Tailwind CSS 4 · MSW (API REST mock) · Vite · JavaScript (ES6)
