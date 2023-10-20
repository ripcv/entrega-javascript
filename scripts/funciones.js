
// Funciones
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
 function mostrarCarrito(carrito){
    console.clear();
            console.log("Productos Actuales en el carrito");
            for (let i = 0; i < carrito.length; i++) {
                let productoNombre = encontarProducto(carrito[i].id.toString());
                console.log("Producto: " + productoNombre.nombre + "\nValor: " + carrito[i].valor + "\nCantidad: " + carrito[i].cantidad);
            }
} 


const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const miLocalStorage = window.localStorage;

//Pintamos los productos en el HTML
function mostrarProductos(){
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

)} 

 function mostrarCarrito() {
    const productos = [];
    if(carrito){
    // Los convertimos nuevamente a una clase
    carrito.forEach(p => {
        const producto = new Producto(p.id, p.nombre,p.valor, p.cantidad)
        productos.push(producto);
    })
    console.table(productos)
    let cuerpoCarrito = document.getElementById("detalleCarrito");
    const mostrarDetalle = (e = []) => {
        cuerpoCarrito.innerHTML = "";
        e.forEach((productos) => { 
            const unRegistro = document.createElement("tr");
            unRegistro.innerHTML =`
            <td scope="col">${productos.nombre} </td>
            <td scope="col">${productos.cantidad} </td>
            <td scope="col">${divisa}${productos.valor} </td>
            <td scope="col">${divisa}${productos.total()} </td>
            <td scope="col"><button> X </button> </td>
            `;
        cuerpoCarrito.appendChild(unRegistro);
    });
    }

  mostrarDetalle(productos);
  }else{
    showErrorMessages (["No Hay Productos en el Carrito Aun"], true);
  }
}
function agregarProductoAlCarro(e){
    let productoAgregar = encontarProducto(e.target.getAttribute('idproducto'))
    let productoAComprar = new Producto(productoAgregar.id,productoAgregar.nombre, productoAgregar.valor, 1)
    let productoExiste = carrito.find(producto => producto.id === productoAgregar.id);
    
    if(productoExiste){
        productoExiste.cantidad++ ;
    }else{
        productoAgregar.cantidad = 1;
        carrito.push(productoAComprar);
        
    }
   
    guardarEnLocalStorage("carrito",carrito);
    actualizarIconoCarrito(); 
}

function guardarEnLocalStorage (key,data) {
    miLocalStorage.setItem(key, JSON.stringify(data));
}

function recuperarEnLocalStorage(key) {
    const datosGuardados = JSON.parse(localStorage.getItem(key));
    return datosGuardados || false;
}


function actualizarIconoCarrito() {
    const carritoIcon = document.querySelector('.carrito i');
    let cantidad = 0;
    carrito.forEach(e => {
        cantidad += e.cantidad
    });
    
    cantidad > 0 ? carritoIcon.textContent = cantidad : carritoIcon.textContent = ""
}

