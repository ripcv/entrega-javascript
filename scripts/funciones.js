
// Funciones
const miLocalStorage = window.localStorage;

//Mostramos los productos en el HTML de la Tienda.
function mostrarProductos() {
    const DOMitems = document.querySelector('#productos');
    productosMocks.forEach((producto) => {
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
    }

    )
}
//Mostramos el Carrito en el HTML.
function mostrarCarrito() {
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
            <td scope="col">${divisa}${productos.total()} </td>
            <td scope="col"><button class="eliminarproducto" data-productoid="${productos.id}"> X </button> </td>
            `;

                cuerpoCarrito.appendChild(unRegistro);
            });
        }

        mostrarDetalle(productos);
        actualizarTotal();
    } else {
        showErrorMessages(["No Hay Productos en el Carrito Aun"], true);
    }
}



//Funciones para manejar el carrito

function agregarProductoAlCarro(e) {
    let productoAgregar = encontrarProducto(e.target.getAttribute('idproducto'))
    let productoAComprar = new Producto(productoAgregar.id, productoAgregar.nombreProducto, productoAgregar.valor, 1)
    let productoExiste = carrito.find(producto => producto.id === productoAgregar.id);

    if (productoExiste) {
        siExisteStock(productoExiste.id, productoExiste.cantidad) ? productoExiste.cantidad++ : showErrorMessages(["Stock maximo alcanzado del producto " + productoExiste.nombreProducto], true);
        setTimeout(function () {
            hideMessages();
        }, 2000);
    } else {
        productoAgregar.cantidad = 1;
        carrito.push(productoAComprar);
    }

    guardarEnLocalStorage("carrito", carrito);
    actualizarIconoCarrito();
}

function actualizarCarrito(e, operacion, nuevacantidad) {

    if (operacion) {
        const carritoActualizado = carrito.filter(producto => parseInt(producto.id) !== parseInt(e));
        guardarEnLocalStorage("carrito", carritoActualizado)
    } else {
        let productoExiste = carrito.find(producto => producto.id === e);
        if (productoExiste && siExisteStock(productoExiste.id, nuevacantidad - 1)) {
            productoExiste.cantidad = nuevacantidad
            guardarEnLocalStorage("carrito", carrito)
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

function siExisteStock(id, cantidad) {
    let stockProducto = encontrarProducto(id);
    if (cantidad < stockProducto.stock) {
        return true;
    } else {
        return false;
    }
}

function encontrarProducto(buscarProducto) {
    return productosMocks.find(producto => producto.id === parseInt(buscarProducto));

}

function actualizarIconoCarrito() {
    const carritoIcon = document.querySelector('.carrito i');
    let cantidad = 0;
    carrito.forEach(e => {
        cantidad += e.cantidad
    });

    cantidad > 0 ? carritoIcon.textContent = cantidad : carritoIcon.textContent = ""
}


function actualizarTotal() {
    let subtotal = 0;
    carrito.forEach(producto => {
        subtotal += producto.valor * producto.cantidad;
    })

    let iva = subtotal * (IVA / 100);
    total = subtotal + iva
    const subtotalElement = document.getElementById("subtotal");
    const ivaElement = document.getElementById("iva");
    const totalElement = document.getElementById("total");

    subtotalElement.textContent = `${divisa}${subtotal}`;
    ivaElement.textContent = `${divisa}${iva}`;
    totalElement.textContent = `${divisa}${total}`;
}
/*    */


// Funciones para manejar el LocalStorage
function guardarEnLocalStorage(key, data) {
    miLocalStorage.setItem(key, JSON.stringify(data));
}

function recuperarEnLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

/*    */



//Transformamos a Clase cuando sea necesario.
function toClass(nombreClase, datos) {
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
function mostrarOrdenes() {
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
            <td scope="col">${orden.totalCompra} </td>
            `;

            cuerpoOrdenes.appendChild(unRegistro);
        }); 
    }
    mostrarDetalle(recuperarEnLocalStorage("ordenCompra"));
}

function validarCampos() {
    const nombreValido = /^[A-Za-záéíóúü\s]+$/i.test(nombreUsuario.value.trim());
    const direccionValida = direccionUsuario.value.trim() !== '';
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoUsuario.value.trim());
    const telefonoValido = /^\d{9}$/.test(telefonoUsuario.value.trim());

    if (nombreValido && direccionValida && correoValido && telefonoValido && carrito.length) {
        return true;
    } else {

        if (!nombreValido)
            showErrorMessages(["No se ha ingresado el Nombre."], true);
        if (!direccionValida)
            showErrorMessages(["No se ha ingresado la dirección de envío."], true);
        if (!correoValido)
            showErrorMessages(["Ingrese un correo válido."], true);
        if (!telefonoValido)
            showErrorMessages(["Ingrese un número de teléfono válido (9 dígitos)."], true);
        if (!carrito.length)
            showErrorMessages(["Ingrese Productos para poder Finalizar la Compra"], true);

        setTimeout(function () {
            hideMessages();
        }, 2000);

        return false;
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

function encontrarNombreProducto(idProducto) {
    const productoEncontrado = productosMocks.find(producto => producto.id === idProducto);
    return productoEncontrado ? productoEncontrado.nombreProducto : false;
}
/*                */