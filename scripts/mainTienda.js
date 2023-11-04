//Importamos la funciones y variables necesarias
import { cargarMenu,mostrarLogout,logout,recuperarEnLocalStorage,actualizarCarrito,mostrarProductos,actualizarIconoCarrito } from "./funciones.js";
// Generamos los productos en el html.

cargarMenu().then(() => {
        mostrarLogout()
        actualizarIconoCarrito()
        document.getElementById("logout-link").onclick = logout;

        
  }).catch(error => {
    console.error('Error Menu:', error);
  });

  document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();
    
    });
    