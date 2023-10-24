//Clases
// definimos la clase para crear el objeto del carro de compra
class OrdenCompra {
    constructor(rutCliente, idOrden, productos, fechaCompra, fechaEnvio, totalCompra) {
        this.rutCliente = rutCliente;
        this.idOrden = idOrden;
        this.productos = productos;
        this.fechaCompra = fechaCompra
        this.fechaEnvio = fechaEnvio
        this.totalCompra = totalCompra
    }
    ordenFinalizada = () => {
        return "Se han pagado: " + this.totalCompra + "\nSu pedido sera despachado el " + this.fechaEnvio;
    }
}
// definimos la clase para crear objeto producto para agregarlo al carro de compras
class Producto {
    constructor(id, nombreProducto, valor, cantidad) {
        this.id = id;
        this.nombreProducto = nombreProducto;
        this.valor = valor;
        this.cantidad = cantidad;
    }
    total = () => {
        return this.valor * this.cantidad;
    }
}

// definimos la clase para crear objeto cliente

class Cliente {
    constructor(nombre, apellido, rut, fechaNacimiento, correo, clave){
        this.nombre = nombre;
        this.apellido = apellido;
        this.rut = rut;
        this.fechaNacimiento = fechaNacimiento;
        this.correo = correo;
        this.clave = clave;
    }
    toString = () => {
        return this.nombre + " " + this.apellido;
    }
}