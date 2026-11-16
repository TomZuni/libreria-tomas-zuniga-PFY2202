// "Base de datos" del mock: categorías y libros de la librería.
// El servidor falso (handlers.js) responde con estos datos.

export const CATEGORIAS = [
  { id: 1, nombre: 'Ficción', icono: '📖', descripcion: 'Novelas y cuentos que nacen de la imaginación.' },
  { id: 2, nombre: 'Ciencia Ficción', icono: '🚀', descripcion: 'Futuros posibles, tecnología y mundos más allá de la Tierra.' },
  { id: 3, nombre: 'Fantasía', icono: '🐉', descripcion: 'Magia, criaturas y mundos épicos.' },
  { id: 4, nombre: 'Misterio', icono: '🕵️', descripcion: 'Crímenes, enigmas y detectives memorables.' },
  { id: 5, nombre: 'Historia', icono: '🏛️', descripcion: 'Cómo llegamos hasta aquí, contado con rigor.' },
  { id: 6, nombre: 'Infantil', icono: '🧸', descripcion: 'Lecturas para los más pequeños (y no tanto).' },
  { id: 7, nombre: 'Novedades', icono: '✨', descripcion: 'Los títulos que llegarán pronto a la librería.' },
]

export const LIBROS = [
  { id: 1, categoriaId: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', anio: 1967, paginas: 471, precio: 14990, disponible: true, descripcion: 'La saga de la familia Buendía en el mítico pueblo de Macondo.' },
  { id: 2, categoriaId: 1, titulo: 'La casa de los espíritus', autor: 'Isabel Allende', anio: 1982, paginas: 433, precio: 13990, disponible: true, descripcion: 'Tres generaciones de mujeres atravesadas por la historia de Chile.' },
  { id: 3, categoriaId: 1, titulo: 'Pedro Páramo', autor: 'Juan Rulfo', anio: 1955, paginas: 144, precio: 8990, disponible: true, descripcion: 'Un viaje a Comala, un pueblo habitado por voces de muertos.' },
  { id: 4, categoriaId: 1, titulo: 'Ficciones', autor: 'Jorge Luis Borges', anio: 1944, paginas: 192, precio: 9990, disponible: false, descripcion: 'Cuentos sobre laberintos, bibliotecas infinitas y espejos.' },
  { id: 5, categoriaId: 1, titulo: 'El amor en los tiempos del cólera', autor: 'Gabriel García Márquez', anio: 1985, paginas: 464, precio: 13490, disponible: true, descripcion: 'Una historia de amor que espera más de cincuenta años.' },

  { id: 6, categoriaId: 2, titulo: 'Dune', autor: 'Frank Herbert', anio: 1965, paginas: 688, precio: 17990, disponible: true, descripcion: 'La lucha por el planeta desierto Arrakis y su especia.' },
  { id: 7, categoriaId: 2, titulo: 'Fahrenheit 451', autor: 'Ray Bradbury', anio: 1953, paginas: 256, precio: 9990, disponible: true, descripcion: 'En un futuro donde los libros se queman, un bombero comienza a dudar.' },
  { id: 8, categoriaId: 2, titulo: 'Fundación', autor: 'Isaac Asimov', anio: 1951, paginas: 296, precio: 11990, disponible: true, descripcion: 'La psicohistoria intenta salvar la civilización galáctica.' },
  { id: 9, categoriaId: 2, titulo: 'Neuromante', autor: 'William Gibson', anio: 1984, paginas: 336, precio: 12990, disponible: false, descripcion: 'La novela que dio origen al género ciberpunk.' },
  { id: 10, categoriaId: 2, titulo: 'Solaris', autor: 'Stanisław Lem', anio: 1961, paginas: 224, precio: 10490, disponible: true, descripcion: 'Un océano pensante pone a prueba los límites del conocimiento humano.' },

  { id: 11, categoriaId: 3, titulo: 'El Hobbit', autor: 'J. R. R. Tolkien', anio: 1937, paginas: 310, precio: 12990, disponible: true, descripcion: 'Bilbo Bolsón parte a una aventura que cambiará su vida.' },
  { id: 12, categoriaId: 3, titulo: 'El nombre del viento', autor: 'Patrick Rothfuss', anio: 2007, paginas: 880, precio: 19990, disponible: true, descripcion: 'La historia de Kvothe, contada por él mismo.' },
  { id: 13, categoriaId: 3, titulo: 'Un mago de Terramar', autor: 'Ursula K. Le Guin', anio: 1968, paginas: 224, precio: 10990, disponible: true, descripcion: 'Un joven mago aprende el precio de su poder.' },
  { id: 14, categoriaId: 3, titulo: 'Mistborn: El Imperio Final', autor: 'Brandon Sanderson', anio: 2006, paginas: 672, precio: 16990, disponible: true, descripcion: 'Una banda de ladrones intenta derrocar a un emperador inmortal.' },
  { id: 15, categoriaId: 3, titulo: 'Stardust', autor: 'Neil Gaiman', anio: 1999, paginas: 248, precio: 9490, disponible: false, descripcion: 'Un cuento de hadas para adultos al otro lado del muro.' },

  { id: 16, categoriaId: 4, titulo: 'Asesinato en el Orient Express', autor: 'Agatha Christie', anio: 1934, paginas: 256, precio: 8990, disponible: true, descripcion: 'Hércules Poirot investiga un crimen en un tren detenido por la nieve.' },
  { id: 17, categoriaId: 4, titulo: 'El nombre de la rosa', autor: 'Umberto Eco', anio: 1980, paginas: 592, precio: 15990, disponible: true, descripcion: 'Crímenes en una abadía medieval y una biblioteca prohibida.' },
  { id: 18, categoriaId: 4, titulo: 'Los hombres que no amaban a las mujeres', autor: 'Stieg Larsson', anio: 2005, paginas: 600, precio: 14490, disponible: true, descripcion: 'Un periodista y una hacker investigan una desaparición de hace décadas.' },
  { id: 19, categoriaId: 4, titulo: 'El perro de los Baskerville', autor: 'Arthur Conan Doyle', anio: 1902, paginas: 256, precio: 7990, disponible: true, descripcion: 'Sherlock Holmes frente a una leyenda que acecha los páramos.' },

  { id: 20, categoriaId: 5, titulo: 'Sapiens: de animales a dioses', autor: 'Yuval Noah Harari', anio: 2011, paginas: 496, precio: 17990, disponible: true, descripcion: 'Una breve historia de la humanidad.' },
  { id: 21, categoriaId: 5, titulo: 'Armas, gérmenes y acero', autor: 'Jared Diamond', anio: 1997, paginas: 592, precio: 16490, disponible: true, descripcion: 'Por qué unas sociedades dominaron a otras.' },
  { id: 22, categoriaId: 5, titulo: 'SPQR: una historia de la antigua Roma', autor: 'Mary Beard', anio: 2015, paginas: 608, precio: 18990, disponible: false, descripcion: 'Mil años de Roma, de aldea a imperio.' },
  { id: 23, categoriaId: 5, titulo: 'Breve historia del mundo', autor: 'Ernst H. Gombrich', anio: 1936, paginas: 320, precio: 12490, disponible: true, descripcion: 'La historia universal contada con claridad para todos.' },

  { id: 24, categoriaId: 6, titulo: 'El principito', autor: 'Antoine de Saint-Exupéry', anio: 1943, paginas: 96, precio: 6990, disponible: true, descripcion: 'Un piloto conoce a un pequeño príncipe llegado de otro planeta.' },
  { id: 25, categoriaId: 6, titulo: 'Matilda', autor: 'Roald Dahl', anio: 1988, paginas: 240, precio: 7490, disponible: true, descripcion: 'Una niña muy lectora descubre que tiene un poder especial.' },
  { id: 26, categoriaId: 6, titulo: 'Charlie y la fábrica de chocolate', autor: 'Roald Dahl', anio: 1964, paginas: 192, precio: 7490, disponible: true, descripcion: 'Cinco niños visitan la fábrica más misteriosa del mundo.' },
  { id: 27, categoriaId: 6, titulo: 'Alicia en el país de las maravillas', autor: 'Lewis Carroll', anio: 1865, paginas: 160, precio: 6490, disponible: true, descripcion: 'Una caída por la madriguera de un conejo lleva a un mundo sin lógica.' },
]

// La categoría "Novedades" no tiene libros todavía: sirve para probar el estado vacío.
