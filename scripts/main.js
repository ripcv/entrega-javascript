// Archivo de código fuente principal, contiene todas las funcionalidades más generales y transversales a las funcionalidades del pryecto.

/* console.log("Bienvenido a la Clase 2")

let precio = parseFloat(prompt("Cual es el precio de tu compra?"));
let descuento = 0
let total = 0
if (precio < 2000){
    total = precio;
}else if (precio < 5000){
    descuento = precio * 0.15;
}else if(precio < 10000){
    descuento = precio * 0.25;
}else{
    descuento = precio * 0.45;
}

alert("Tendras que pagar un total de " + (total = precio-descuento)); */



/* let precio = parseFloat(prompt("Ingrese Precio"));

let descuento = parseFloat(prompt("Ingrese descuento"));

let total;

if(descuento < 1){
total = precio-(precio*descuento);
console.log(total);
}else{
    total = precio-((precio*descuento)/100);
    console.log(total);
} */

// Ejemplo FOR

const numero = parseInt(prompt("¿Ingresa un numero para generar tabla?: "))
for (let desde  = 1 ; desde < 11; desde++){
     console.log ("--> " + numero + " * " + desde + " = " + (numero*desde))
}
