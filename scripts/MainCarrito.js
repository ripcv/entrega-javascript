//Importamos funciones y variables
import { carrito,keyCarrito, keyOrden, keyUsuario } from "./main.js";
import {
    cargarMenu,mostrarLogout,logout, mostrarCarrito, actualizarIconoCarrito, recuperarEnLocalStorage,borrarLocalStorage, toClass, validarCampos,
    fechaFormateada, guardarEnLocalStorage, actualizarCarrito, mensaje
} from "./funciones.js";

//cargamos el menu y si se carga correctamente, ejecutamos los procesos.
cargarMenu().then(() => {
    mostrarLogout()
    mostrarCarrito();
    actualizarIconoCarrito();
    document.getElementById("logout-link").onclick = logout;
    //Capturamos procesos del Carrito
    //Eliminar Producto
    const botonesEliminar = document.querySelectorAll(".eliminarproducto");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", (event) => {
            actualizarCarrito(event.target.getAttribute("data-productoid"), true)
        });
    });

    //Actualizamos la cantidad del producto si se cambia el numero en el input.
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
        if (validarCampos(telefonoUsuario)) {
            let fechaActual = fechaFormateada(new Date());
            let fechaEnvio = fechaFormateada(new Date(new Date().getTime() + 48 * 60 * 60 * 1000));
            const productoOrden = [];
            const nuevaOrden = recuperarEnLocalStorage(keyOrden) || [];
            //Recorremos los productos del carrito y lo agregamos a un nuevo array 
            //solo con los datos que necesitamos para la orden.
            carrito.forEach(producto => {
                const productoNuevo = {
                    id: producto.id,
                    valor: producto.valor,
                    cantidad: producto.cantidad
                };
                productoOrden.push(productoNuevo);
            })

            //Obtenemos los datos del pago y creamos la nueva Orden que posteriormente guardamos en el storage.
            const totalCompraTexto = document.getElementById("total").innerText;
            const totalCompraNumerico = parseFloat(totalCompraTexto.replace(/[^\d.-]/g, ''));
            const orden = {
                rutCliente: recuperarEnLocalStorage(keyUsuario).rut,
                idOrden: nuevaOrden.length === 0 ? (ordenesMocks[ordenesMocks.length - 1].idOrden + 1) : (nuevaOrden[nuevaOrden.length - 1].idOrden + 1),
                productos: productoOrden,
                fechaCompra: fechaActual,
                fechaEnvio: fechaEnvio,
                totalCompra: totalCompraNumerico
            };
            nuevaOrden.push(orden);
            guardarEnLocalStorage(keyOrden, nuevaOrden);
            borrarLocalStorage(keyCarrito);
            showSuccessMessages([toClass("OrdenCompra", orden).ordenFinalizada()], true);
            setTimeout(function () {
                hideMessages();
                window.location.href = "./ordenes.html";
            }, 5000);
        }
    }

    const usuarioLogeado = recuperarEnLocalStorage(keyUsuario);
    if (usuarioLogeado) {
        const usuario = toClass("Cliente", usuarioLogeado)
        nombreUsuario.value = `${usuario.toString()}`;
        correoUsuario.value = `${usuario.correo}`;

    }

    
}).catch(error => {
    mensaje("warning","No se Pudo mostrar el carrito");
});







