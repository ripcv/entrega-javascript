import { cargarMenu,mostrarLogout,mostrarOrdenes } from "./funciones.js";

cargarMenu().then(() => {
    mostrarLogout();
    mostrarOrdenes();
}).catch(error => {
console.error('Error Menu:', error);
});


