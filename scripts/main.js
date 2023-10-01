/* Segunda Pre-Entrega JS, realizaremos una 
simulación de una web donde se venderan productos de una Banda */

//Para ingresar de inmediato escribir Raul y por el momento no se autenticara con la clave.
let nombreUsuario = prompt("Ingrese Nombre de Usuario");
let terminar = false;
let consultaCompra = '';
while (!terminar) {
    if (!encontrarCliente(nombreUsuario)) {
        alert("El nombre ingresado no existe");
        nombreUsuario = prompt("Ingrese un nombre de Usuario Valido para continuar \no escriba salir para cerrar. ");
    } else {

        alert("Bienvenido, " + nombreUsuario + "!");
        consultaCompra = validarRespuesta(prompt("¿Quiere comprar algun producto?, ingrese 'Si' o 'No' "));
        let agregarProducto = [];
        while (consultaCompra !== "no") {
            let nombresProductos = productosMocks.map(producto => producto.id + " - " + producto.nombre);

            let productoSeleccionado = encontarProducto(prompt("Seleccione un producto:\n" + nombresProductos.join("\n")));
            if (productoSeleccionado) {
                let cantidad = validarNumero(parseInt(prompt("Producto: " + productoSeleccionado.nombre + "\n¿Cuantos quiere agregar al carro? \nvalor por c/u: $" + productoSeleccionado.valor)))
                //por ahora no se valida que la cantidad ingresada sea menor o igual al stock del producto.
                let productoAComprar = new Producto(productoSeleccionado.id, productoSeleccionado.valor, cantidad)
                agregarProducto.push(productoAComprar);

            } else{
                alert("Producto no encontrado, intentelo nuevamente");
            }
            //Mostramos detalle de los productos en el carrito
            console.clear();
            console.log("Productos Actuales en el carrito");
            for (let i = 0; i < agregarProducto.length; i++) {
                let productoNombre = encontarProducto(agregarProducto[i].id.toString());
                console.log("Producto: " + productoNombre.nombre + "\nValor: " + agregarProducto[i].valor + "\nCantidad: " + agregarProducto[i].cantidad);
            }
            if(productoSeleccionado !== null){
            consultaCompra = validarRespuesta(prompt("¿Quiere agregar otro producto, ingrese 'Si' o 'No' "));
            }
        }


        if (consultaCompra !== "no" || agregarProducto.length > 0) {
            // Consultamos si quiere finalizar la compra o salir del programa
            let finalizarCompra = validarRespuesta(prompt("¿Quiere finalizar la compra?, ingrese si o no"));
            if (finalizarCompra === "si") {
                // Calculamos la fecha de compra y de envio
                let fechaActual = fechaFormateada(new Date());
                let fechaEnvio = fechaFormateada(new Date(new Date().getTime() + 48 * 60 * 60 * 1000));
                const IVA = 1.19;
                //Se Calcula el total de la orden
                const totalOrden = agregarProducto.reduce((total, producto) => total + producto.total(), 0)*IVA;
                //Creamos el objeto OrdendeCompra 
                let nuevaOrdenCompra = new OrdenCompra(encontrarCliente(nombreUsuario).rut, ordenesMocks[ordenesMocks.length - 1].idOrden + 1, agregarProducto, fechaActual, fechaEnvio, totalOrden);


                //Mostrar detalle total a pagar
                console.log("Total a Pagar por los Productos: " + totalOrden + " Iva Incluido");
                let confirmarCompra = validarRespuesta(prompt("¿Proceder al Pago?: Si - No"));
                if (confirmarCompra === "si") {
                    alert(nuevaOrdenCompra.ordenFinalizada());
                    //Se Agrega al resto de ordenes y se imprimen las ordenes asociadas al cliente.
                    ordenesMocks.push(nuevaOrdenCompra);
                    console.table(ordenesMocks.filter((cliente) => cliente.rutCliente.includes(encontrarCliente(nombreUsuario).rut)));
                    salir();

                } else {
                    alert(mensaje())
                }

            } else {
                alert(mensaje())
            }

        }

    }
    if (nombreUsuario.trim().toLowerCase() === "salir" || consultaCompra === "no") {
        alert("Gracias por visitarnos...");
        salir();
    }
}


