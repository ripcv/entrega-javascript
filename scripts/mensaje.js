//Código reutilizado de la clase

// Sección para definir funcionalidad genérica para mostrar mensajes de error en la UI en un componente estático dentro de la página (no es un toast).
const messagesContainer = document.getElementById("mensaje");
/**
 *
 * @param {*} messages Colección de mensajes representados por cadenas de texto en un array
 * @param {*} type Tipo de estilo esperado para mostrar en pantalla: success | danger
 * @param {*} title Título que acompañará al mensaje en la pantalla para ofrecer contexto
 */
function showMessages(
  messages = [],
  type = "success",
  isAdding = false
) {
  messagesContainer.className = `alert alert-${type}`;
  // Establecemos el título
  let messagesTitle = document.querySelector("#errorsMessages h6");
  if (!messagesTitle) {
    messagesTitle = document.createElement("h6");
    messagesTitle.className = "alert-heading";
    messagesContainer.appendChild(messagesTitle);
  } else {
    messagesTitle.innerText = title;
  }

  // Añadimos unos a uno los mensajes
  if (messages.length) {
    let messagesList = document.querySelector("#errorsMessages ul");
    if (isAdding && messagesList) {
      addMessages(messagesList, messages);
    } else if (!messagesList) {
      messagesList = document.createElement("ul");
      addMessages(messagesList, messages);
    }
  }
}

const addMessages = (messagesList, messages) => {
  if (messagesList) {
    messages.forEach((msjs) => {
      let messageItem = document.createElement("li");
      //messageItem.setAttribute("class", "mb-0");
      messageItem.innerText = msjs;
      messagesList.appendChild(messageItem);
    });
    messagesContainer.appendChild(messagesList);
  }
};

/**
 *
 * @param {*} messages Mostrar en pantalla mensajes con un estilo success
 */
function showSuccessMessages(
  messages = [],
  isAdding = false,
) {
  showMessages(messages, "success", isAdding);
}


function showErrorMessages(
  messages = [],
  isAdding = false,
) {
  showMessages(messages, "danger", isAdding);
}

const clearMessages = () => {
  messagesContainer.innerText = "";
};

const hideMessages = () => {
  messagesContainer.className = "hide";
  clearMessages();
};

// Sección para definir funcionalidad genérica para mostrar mensajes de error en la UI en un componente flotante dentro de la página (es un toast).

// PROXIMAMENTE

