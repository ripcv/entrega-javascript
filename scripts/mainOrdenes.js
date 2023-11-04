import { cargarMenu,mostrarLogout,logout,mostrarOrdenes } from "./funciones.js";

cargarMenu().then(() => {
    mostrarLogout();
    mostrarOrdenes();
    document.getElementById("logout-link").onclick = logout;
}).catch(error => {
console.error('Error Menu:', error);
});


