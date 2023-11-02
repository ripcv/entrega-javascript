import { cargarMenu,mostrarOrdenes } from "./funciones.js";

cargarMenu().then(() => {
    mostrarOrdenes();
}).catch(error => {
console.error('Error Menu:', error);
});

document.addEventListener('DOMContentLoaded', () => {
mostrarProductos();

});

