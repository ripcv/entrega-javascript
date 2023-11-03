/* Entrega Final JS, realizaremos una 
simulación de una web donde se venderan productos de una Banda */

import { recuperarEnLocalStorage} from "./funciones.js";

//Variables Globales
export const carrito = recuperarEnLocalStorage("carrito") || [];
export const divisa = '$';
export const IVA = 19;

//funcionalidades se encuentran en sus respectivos js
/* 
mainLogin.js
mainTienda.js
mainCarrito.js

Datos para logear
correo: ana@martinez.com
clave: password

correo: luis@gmail.com
clave: 01234

correo: raul@alvarez.cl
clave: 12345
 */