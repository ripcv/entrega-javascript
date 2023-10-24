const miLogin = document.getElementById("loginForm");
miLogin.addEventListener("submit",(e) => {
    e.preventDefault();
    let correoUsuario = document.getElementById("correo").value;
    let claveUsuario = document.getElementById("password").value;


if(isExisteCliente(clientes,correoUsuario)){
    const unCliente = getCliente(clientes,correoUsuario)
    console.table(unCliente);
    if(unCliente.clave===claveUsuario){
        showSuccessMessages(["Login Correcto"], true);
        guardarEnLocalStorage("usuario",unCliente);
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