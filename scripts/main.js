/* Primera Pre-Entrega JS, realizaremos una 
simulación de una web donde se venderan productos de una Banda */


//Declaramos variables globales
const IVA = 1.19;

// Declaro estas variables para darle más funcionalidad al codigo.
const PRODUCTO1 = "Bolso Blanco";
const PRODUCTO2 = "Gorro de Lana";
const PRODUCTO3 = "Jockey";
const PRODUCTO4 = "Llavero";

const PRODUCTOS_MENU = "\n\t 1.- " + PRODUCTO1 + "\n\t 2.- " + PRODUCTO2 + "\n\t 3.- " + PRODUCTO3 + "\n\t 4.- " + PRODUCTO4;

const VALOR_PRODUCTO1 = 15000;
const VALOR_PRODUCTO2 = 7000;
const VALOR_PRODUCTO3 = 10000;
const VALOR_PRODUCTO4 = 5000;

let cantProducto1 = 0;
let cantProducto2 = 0;
let cantProducto3 = 0;
let cantProducto4 = 0;

// Funciones
function calcular_total(cantidad1,cantidad2,cantidad3,cantidad4){
   
    let valor = (cantidad1*VALOR_PRODUCTO1)+(cantidad2*VALOR_PRODUCTO2)+(cantidad3*VALOR_PRODUCTO3)+(cantidad4*VALOR_PRODUCTO4);

    valor = valor*IVA;
    return valor;
}

// Iniciaremos con una simulación de Login de usuario
let nombreUsuario = prompt("Ingrese su nombre de usuario");

// Si el usuario no ingresa un nombre se vuelve a solicitar
while (nombreUsuario == '') {
    nombreUsuario = prompt("Favor ingrese un nombre de usuario valido");

}
let clave = prompt("Ingrese su clave"); // no se encrypta ni se valida el campo, es solo demostrativo
alert("Bienvenido " + nombreUsuario);


// Generamos simulación de agregar prodcutos al carrito
let consultaCompra = prompt("¿Quiere comprar algun producto?, ingrese 'Si' o 'No' ");
while (consultaCompra.toLowerCase().trim() != "no") {

    let seleccionProducto = parseInt(prompt("Seleccione un producto" + PRODUCTOS_MENU)); // al no trabajar con array el valor del producto se ira reemplazando 
    switch (seleccionProducto) {
        case 1:
            console.log("Se Agrego" + PRODUCTO1 + " al Carrito");
            cantProducto1++;
            break
        case 2:
            console.log("Se Agrego " + PRODUCTO2 + " al Carrito");
            cantProducto2++;
            break
        case 3:
            console.log("Se Agrego " + PRODUCTO3 + " al Carrito");
            cantProducto3++;
            break
        case 4:
            console.log("Se Agrego " + PRODUCTO4 + " a al Carrito");
            cantProducto4++;
            break
        default:
            alert("Ingrese un producto valido para agregar");
    }
    consultaCompra = prompt("¿Quiere agregar otro producto, ingrese 'Si' o 'No' ");
}

console.log("Se Agregaron los siguiente productos");
if (cantProducto1 > 0)
    console.log(PRODUCTO1 + " " + cantProducto1 + " veces");
if (cantProducto2 > 0)
    console.log(PRODUCTO2 + " " + cantProducto2 + " veces");
if (cantProducto3 > 0)
    console.log(PRODUCTO3 + " " + cantProducto3 + " veces");
if (cantProducto4 > 0)
    console.log(PRODUCTO4 + " " + cantProducto4 + " veces");


let finalizarCompra = prompt("¿Desea Finalizar la compra?, ingrese Si o No")

if (finalizarCompra.toLowerCase().trim() == "si") {
    let total = calcular_total(cantProducto1, cantProducto2, cantProducto3, cantProducto4);
    console.log("El total de tu cuenta es: " + total)
} else {
    alert("Cuando vuelvas tus productos te estaran esperando")
}
