//Importamos variables
import { divisa, IVA, carrito, keyCarrito, keyUsuario, keyOrden } from "./main.js";

let productosJson;

if (!productosJson) {
    fetch('../mocks/productos.json')
        .then((respuesta) => respuesta.json())
        .then((productos) => {
            productosJson = productos;
        })
        .catch(error => {
            mensaje("warning", "No se pudieron cargar los productos");
        });
}

// Funciones
const miLocalStorage = window.localStorage;

//Cargamos el menu 
export function cargarMenu() {
    return new Promise((resolve, reject) => {
        fetch('../pages/menu.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('menu').innerHTML = data;
                resolve();
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function mostrarLogout() {
    if (localStorage.getItem(keyUsuario)) {
        document.getElementById("logout").style.display = "block";
    } else {
        document.getElementById("logout").style.display = "none";
    }
}

export function logout() {
    Swal.fire({
        title: 'Esta seguro?',
        text: "Sus productos no se guardaran si deslogea.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Deslogearme!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            borrarLocalStorage(keyCarrito);
            borrarLocalStorage(keyUsuario);
            borrarLocalStorage(keyOrden);
            setTimeout(function () {
                window.location.href = "../index.html";
            }, 1000);
        }
    })

}

//Mostramos los productos en el HTML de la Tienda.
export function mostrarProductos() {
    const DOMitems = document.querySelector('#productos');
    fetch('../mocks/productos.json')
        .then((respuesta) => respuesta.json())

        .then((productos) => {
            productos.forEach((producto) => {
                const NODO = document.createElement('div');
                NODO.classList.add('tarjeta-producto');

                const nodoImagen = document.createElement('img');
                nodoImagen.setAttribute('src', `../assets/images/tienda/${producto.img}`)

                const nodoTitulo = document.createElement('h5');
                nodoTitulo.textContent = producto.nombre;

                const nodoDetalle = document.createElement('p');
                nodoDetalle.textContent = producto.descripcion;

                const nodoPrecio = document.createElement('span');
                nodoPrecio.textContent = `${divisa}${producto.valor}`;

                const nodoBoton = document.createElement('button');
                nodoBoton.classList.add('boton-principal');
                nodoBoton.textContent = 'Comprar';
                nodoBoton.setAttribute('idproducto', producto.id);
                nodoBoton.addEventListener('click', agregarProductoAlCarro);

                NODO.appendChild(nodoImagen);
                NODO.appendChild(nodoTitulo);
                NODO.appendChild(nodoDetalle);
                NODO.appendChild(nodoPrecio);
                NODO.appendChild(nodoBoton);
                DOMitems.appendChild(NODO);

            })

            productosJson = productos;
        })


}
//Mostramos el Carrito en el HTML.
export function mostrarCarrito() {
    if (carrito != "") {
        // Los convertimos nuevamente a una clase
        const productos = toClass("Producto", carrito)
        let cuerpoCarrito = document.getElementById("detalleCarrito");
        const mostrarDetalle = (e = []) => {
            cuerpoCarrito.innerHTML = "";
            e.forEach((productos) => {
                const unRegistro = document.createElement("tr");
                unRegistro.innerHTML = `
            <td scope="col">${productos.nombreProducto} </td>
            <td scope="col"><input class="cantidad-input" name="cantidad" type="number" value="${productos.cantidad}" data-productid="${productos.id}" /></td>
            <td scope="col">${divisa}${productos.valor} </td>
            <td scope="col" id="${productos.id}">${divisa}${productos.total()} </td>
            <td scope="col"><button class="eliminarproducto" data-productoid="${productos.id}"> X </button> </td>
            `;

                cuerpoCarrito.appendChild(unRegistro);
            });
        }

        mostrarDetalle(productos);
        actualizarTotal();
    } else {
        showErrorMessages(["No Hay Productos en el Carrito aun, visite nuesta tienda para agregar"], true);
        setTimeout(function () {
            hideMessages();
        }, 5000);
    }
}



//Funciones para manejar el carrito

export function agregarProductoAlCarro(e) {
    let productoAgregar = encontrarProducto(e.target.getAttribute('idproducto'))
    let productoAComprar = new Producto(productoAgregar.id, productoAgregar.nombreProducto, productoAgregar.valor, 1)
    let productoExiste = carrito.find(producto => producto.id === productoAgregar.id);

    if (productoExiste) {
        if (siExisteStock(productoExiste.id, productoExiste.cantidad)) {
            productoExiste.cantidad++;
            mensaje("agregado");
        } else {
            mensaje("warning", 'Stock máximo del producto alcanzado');
        }
    } else {
        productoAgregar.cantidad = 1;
        carrito.push(productoAComprar);
        mensaje("agregado");
    }
    guardarEnLocalStorage(keyCarrito, carrito);
    actualizarIconoCarrito();
}

export function actualizarCarrito(e, operacion, nuevacantidad) {

    if (operacion) {
        const carritoActualizado = carrito.filter(producto => parseInt(producto.id) !== parseInt(e));
        guardarEnLocalStorage(keyCarrito, carritoActualizado)
    } else {
        let productoExiste = carrito.find(producto => producto.id === e);
        if (productoExiste && siExisteStock(productoExiste.id, nuevacantidad - 1)) {
            productoExiste.cantidad = nuevacantidad
            guardarEnLocalStorage(keyCarrito, carrito)

            const producto = toClass("Producto", productoExiste);
            const precioActualizado = document.getElementById(producto.id)

            precioActualizado && (precioActualizado.textContent = `${divisa}${producto.total()}`);
        } else {
            showErrorMessages(["Stock maximo alcanzado del producto " + productoExiste.nombreProducto], true);
            setTimeout(function () {
                hideMessages();
                document.location.reload();
            }, 1000);
        }

    }
    actualizarTotal();
}

export function siExisteStock(id, cantidad) {
    let stockProducto = encontrarProducto(id);
    if (cantidad < stockProducto.stock) {
        return true;
    } else {
        return false;
    }
}

export function encontrarProducto(buscarProducto) {
    return productosJson.find(producto => producto.id === parseInt(buscarProducto));

}

export function actualizarIconoCarrito() {
    const carritoIcon = document.querySelector('.carrito i');
    let cantidad = 0;
    carrito.forEach(e => {
        cantidad += e.cantidad
    });

    cantidad > 0 ? carritoIcon.textContent = cantidad : carritoIcon.textContent = ''
}


export function actualizarTotal() {
    let subtotal = 0;
    carrito.forEach(producto => {
        subtotal += producto.valor * producto.cantidad;
    })

    let iva = subtotal * (IVA / 100);
    let total = subtotal + iva
    const subtotalElement = document.getElementById("subtotal");
    const ivaElement = document.getElementById("iva");
    const totalElement = document.getElementById("total");

    subtotalElement.textContent = `${divisa}${subtotal}`;
    ivaElement.textContent = `${divisa}${iva}`;
    totalElement.textContent = `${divisa}${total}`;
}
/*    */


// Funciones para manejar el LocalStorage
export function guardarEnLocalStorage(key, data) {
    miLocalStorage.setItem(key, JSON.stringify(data));
}

export function recuperarEnLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function borrarLocalStorage(key) {
    localStorage.removeItem(key);
}

/*    */


//Transformamos a Clase cuando sea necesario.
export function toClass(nombreClase, datos) {
    if (Array.isArray(datos)) {
        return datos.map(elemento => toClass(nombreClase, elemento));
    }
    switch (nombreClase) {
        case "OrdenCompra":
            const { rutCliente, idOrden, productos, fechaCompra, fechaEnvio, totalCompra } = datos;
            return new OrdenCompra(rutCliente, idOrden, productos, fechaCompra, fechaEnvio, totalCompra);
        case "Producto":
            const { id, nombreProducto, valor, cantidad } = datos;
            return new Producto(id, nombreProducto, valor, cantidad);
        case "Cliente":
            const { nombre, apellido, rut, fechaNacimiento, correo, clave } = datos;
            return new Cliente(nombre, apellido, rut, fechaNacimiento, correo, clave);
        default:
            throw new Error("Clase no reconocida");
    }
}

/*              */


// Funciones relacionadas a las Ordenes
export function mostrarOrdenes() {
    let cuerpoOrdenes = document.getElementById("orden-procesada");

    const mostrarDetalle = (ordenes = []) => {
        cuerpoOrdenes.innerHTML = "";
        ordenes.forEach((orden) => {
            const unRegistro = document.createElement("tr");
            const productosTexto = orden.productos
                .map(producto => `${encontrarNombreProducto(producto.id)} (${producto.cantidad})`)
                .join(', ');
            unRegistro.innerHTML = `
            <td scope="col">${orden.idOrden} </td>
            <td scope="col">${productosTexto}</td>
            <td scope="col">${orden.fechaCompra} </td>
            <td scope="col">${orden.fechaEnvio} </td>
            <td scope="col">${divisa}${orden.totalCompra} </td>
            `;

            cuerpoOrdenes.appendChild(unRegistro);
        });
    }
    mostrarDetalle(recuperarEnLocalStorage(keyOrden));
}

export function validarCampos(telefonoUsuario) {
    const nombreValido = /^[A-Za-záéíóúü\s]+$/i.test(nombreUsuario.value.trim());
    const direccionValida = direccionUsuario.value.trim() !== '';
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoUsuario.value.trim());
    const telefonoValido = /^\d{9}$/.test(telefonoUsuario.value.trim());


    if (nombreValido && direccionValida && correoValido && telefonoValido && carrito.length) {
        return true;
    }
    if (!nombreValido && !direccionValida && !correoValido && !telefonoValido) {
        showErrorMessages(["Debe Logearse para poder Completar el pedido"], true);
        setTimeout(function () {
            hideMessages();
        }, 5000);
    } else {
        if (!carrito.length)
            showErrorMessages(["El Carrito esta Vacio, no se puede finalizar la compra"], true);
        if (!nombreValido)
            showErrorMessages(["No se ha ingresado el Nombre."], true);
        if (!direccionValida)
            showErrorMessages(["No se ha ingresado la dirección de envío."], true);
        if (!correoValido)
            showErrorMessages(["Ingrese un correo válido."], true);
        if (!telefonoValido)
            showErrorMessages(["Ingrese un número de teléfono válido (9 dígitos)."], true);

        setTimeout(function () {
            hideMessages();
        }, 5000);

        return false;
    }
}

export function fechaFormateada(fecha) {
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

export function encontrarNombreProducto(idProducto) {
    const productoEncontrado = productosJson.find(producto => producto.id === idProducto);
    return productoEncontrado ? productoEncontrado.nombreProducto : false;
}
/*                */

/* Mensajes Swet Alert */
export function mensaje(type, msg) {
  
    switch (type) {
        case "success":
            Swal.fire({
                title: 'Operacion Exitosa!',
                text: msg,
                icon: 'success',
                confirmButtonText: 'Cerrar'
            })
            break;
        case "warning":
            Swal.fire({
                title: 'Error!',
                text: msg,
                icon: 'error',
                confirmButtonText: 'Cerrar'
            })
        break;
        case "agregado":
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "Producto Agregado Correctamente"
              });
        break;   
        default:
            break;
    }
}



/*                  */