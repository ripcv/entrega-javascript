//Importamos la funcion necesaria para el funcionamiento de la pagina.
import { keyUsuario,keyOrden } from './main.js';
import { guardarEnLocalStorage } from './funciones.js';

//Capturamos los datos desde el form del login.
const miLogin = document.getElementById("loginForm");
miLogin.addEventListener("submit",(e) => {
    e.preventDefault();
    let correoUsuario = document.getElementById("correo").value;
    let claveUsuario = document.getElementById("password").value;


//Validamos que el cliente exista en la "base", si existe se compara la contraseña.
if(isExisteCliente(clientesMocks,correoUsuario)){
    const unCliente = getCliente(clientesMocks,correoUsuario)
    if(unCliente.clave===claveUsuario){
        showSuccessMessages(["Login Correcto"], true);
        guardarEnLocalStorage(keyUsuario,unCliente);
        const ordenesCliente = ordenesMocks.filter(orden => orden.rutCliente === unCliente.rut);
        
        guardarEnLocalStorage(keyOrden,ordenesCliente);
      
      
        setTimeout(function() {
        window.location.href = "./pages/tienda.html";
        }, 1000);
    }else{
        showErrorMessages (["Clave Incorrecta, intente nuevamente"], true);
        setTimeout(function() {
            hideMessages();
        }, 2000);
    }
}else{
    showErrorMessages (["Usuario no Encontrado"], true);
    setTimeout(function() {
        hideMessages();
    }, 2000);
}
miLogin.reset();
});

const isExisteCliente = (clientes = [], identificador = "") => {
    return clientes.some(
      (unCliente) => unCliente.correo === identificador
    );
  };

  const getCliente = (clientes = [], identificador = "") => {
    return clientes.find(
      (unCliente) => unCliente.correo === identificador
    );
  };