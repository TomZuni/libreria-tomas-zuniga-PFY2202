// Formatea un número como precio en pesos chilenos: 14990 -> "$14.990"
const formatoCLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 })
export const formatoPrecio = (valor) => formatoCLP.format(valor)
