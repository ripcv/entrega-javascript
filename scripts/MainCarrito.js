mostrarCarrito();
actualizarIconoCarrito();

//Capturamos procesos del Carrito
//Eliminar Producto
const botonesEliminar = document.querySelectorAll(".eliminarproducto");
botonesEliminar.forEach(boton => {
    boton.addEventListener("click", (event) => {
        actualizarCarrito(event.target.getAttribute("data-productoid"), true)
    });
});

//Actualizamos la cantidad
const camposCantidad = document.querySelectorAll('.cantidad-input');
camposCantidad.forEach(cantidad => {
    cantidad.addEventListener('change', (event) => {
        const cantidad = parseInt(event.target.value);
        const productoId = parseInt(event.target.getAttribute('data-productid'));
        if (cantidad == 0) {
            actualizarCarrito(productoId, true, cantidad);
            document.location.reload();
        } else {
            actualizarCarrito(productoId, false, cantidad)
        }

        actualizarIconoCarrito();
    })
})


//Si el usuario esta logeado rellenamos algunos campos y dejamos que finalice la compra, de lo contrario le pedimos que logee
// Validamos que el usuario este logeado para finalizar la orden.
// No se ha implementado aun el registro de usuarios.

const nombreUsuario = document.getElementById("nombreUsuario");
const direccionUsario = document.getElementById("direccionUsuario");
const correoUsuario = document.getElementById("correoUsuario");
const telefonoUsuario = document.getElementById("telefonoContacto");


const finalizarCompra = document.getElementById("finalizarcompra");
finalizarCompra.onclick = function () {
    if (validarCampos()) {
        let fechaActual = fechaFormateada(new Date());
        let fechaEnvio = fechaFormateada(new Date(new Date().getTime() + 48 * 60 * 60 * 1000));
       const productoOrden = [];
      
       carrito.forEach(producto => {
        const productoNuevo = {
            id: producto.id,
            valor: producto.valor,
            cantidad: producto.cantidad
        };
        productoOrden.push(productoNuevo);
       })
       const totalCompraTexto = document.getElementById("total").innerText;
       const totalCompraNumerico = parseFloat(totalCompraTexto.replace(/[^\d.-]/g, ''));
       const nuevaOrden = {
                rutCliente: recuperarEnLocalStorage("usuario").rut ,
                idOrden: ordenesMocks[ordenesMocks.length - 1].idOrden + 1,
                productos: productoOrden ,
                fechaCompra: fechaActual,
                fechaEnvio: fechaEnvio,
                totalCompra: totalCompraNumerico
            }; 

      guardarEnLocalStorage("ordenCompra",nuevaOrden);
       localStorage.removeItem("carrito");
       // window.location.href = "./ordenes.html";
    }
}

const usuarioLogeado = recuperarEnLocalStorage("usuario");
if (usuarioLogeado) {
    const usuario = toClass("Cliente", usuarioLogeado)
    nombreUsuario.value = `${usuario.toString()}`;
    correoUsuario.value = `${usuario.correo}`;

} else {
    showErrorMessages(["Recuerde Logearse para poder finalizar la compra"], true);
}




