//Importamos la funciones y variables necesarias
import { recuperarEnLocalStorage,actualizarCarrito,mostrarProductos,actualizarIconoCarrito } from "./funciones.js";
// Generamos los productos en el html.
document.addEventListener('DOMContentLoaded', () => {
mostrarProductos();

});

actualizarIconoCarrito()
