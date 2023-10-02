
// Funciones
function encontrarCliente(nombre) {
    return clientesMocks.find(cliente => cliente.nombre.trim().toLowerCase() === nombre.trim().toLowerCase())

}

function encontarProducto(buscarProducto) {
    if(buscarProducto.length == 0 ){
        alert ("Debe Ingresar el ID o minimo 3 letras")
        return null;
    }else{
    return productosMocks.find(producto => producto.id === parseInt(buscarProducto) || producto.nombre.toLowerCase().includes(buscarProducto.toLowerCase()));
}
}

function fechaFormateada(fecha) {
    let anio = fecha.getFullYear();
    let mes = fecha.getMonth() + 1;
    let dia = fecha.getDate();

    if (mes < 10) {
        mes = "0" + mes;
    }
    if (dia < 10) {
        dia = "0" + dia;
    }

    return anio + "/" + mes + "/" + dia;
}

function calcularTotal(productos) {
    let total = 0;
    for (i = 0; i < productos.length; i++) {
        total = productos[i].valor * productos[i].cantidad;
    }
    return total;
}

function validarRespuesta(respuesta) {
    while (respuesta.trim().toLowerCase() !== 'si' && respuesta.trim().toLowerCase() !== 'no') {
        respuesta = prompt("Favor Ingrese SI o NO");
    }
    return respuesta.trim().toLowerCase();
}

function validarNumero(numero){
    while (isNaN(numero))
    {
        numero = parseInt(prompt ("Favor Ingresar la cantidad en numero")) ;
    }
    return numero;
}

function mensaje() {
    salir();
    return "Sus productos seran guardados por 24 hrs.";
}
function salir() {
    terminar = true;
}

function opcionesFinalizacion(condicion){
    switch (condicion) {
        case 1:
            consultaCompra = "si";
            break;
        case 2:
            console.clear();
            console.log("Elija Producto a Eliminar");
            for (let i = 0; i < agregarProducto.length; i++) {
                let productoNombre = encontarProducto(agregarProducto[i].id.toString());
                console.log("ID: " + (i+1) + "\nProducto: " + productoNombre.nombre);
            }
            let idEliminar = parseInt(prompt("Ingrese Elemento a Eliminar: "));
            let producoExiste = agregarProducto.find(producto => producto.id === idEliminar)
            if (producoExiste) {
                agregarProducto.splice(idEliminar-1,1);
            } else {
                alert("Producto no se encuentra en el carrito");
            }
            consultaCompra = "si";
            break;
        case 3:
            alert(mensaje())
            break;
        default:
            alert("Ingrese una Opcion Correcta")
            break;
    }
}
