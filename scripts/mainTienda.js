//Importamos la funciones y variables necesarias
import { cargarMenu,recuperarEnLocalStorage,actualizarCarrito,mostrarProductos,actualizarIconoCarrito } from "./funciones.js";
// Generamos los productos en el html.

cargarMenu().then(() => {
  
        actualizarIconoCarrito()
  }).catch(error => {
    console.error('Error Menu:', error);
  });

  document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();
    
    });
    