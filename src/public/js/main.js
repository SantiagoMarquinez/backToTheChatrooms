//CREAMOS INSTANCIA DE SOCKET.IO DESDE EL LADO DEL CLIENTE
const socket = io();

// creamos variable para guardar el usuario

let user;
const chatBox = document.getElementById("chatBox");// vinculamos con el elemento con id chatBox

// utilizamos sweet alert para la bienvenida

Swal.fire({
    title: "Identificate",
    input: "text",
    text: "Ingresa tu usuario",
    inputValidator: (value)=>{
        return !value && "Debes ingresar tu usuario para continuar";// si no hay value se le dice que tiene que ingresar un usuario para continuar
    },
    allowOutsideClick: false,
}).then(result=>{
    user = result.value;
})


chatBox.addEventListener("keyup", (event)=>{
    if( event.key==="Enter"){
        if(chatBox.value.trim().length>0) { //trim saca los espacios en blanco del principio y del final de un string. por lo tanto si el mensaje tiene mas de 0 caracteres lo envia al servidor.
            socket.emit("message",{user:user, message:chatBox.value});
            chatBox.value = "";
        }
    }
})


// Listener de mensajes:
socket.on("messagesLogs", data=>{
    const log = document.getElementById("messagesLogs") ; // messagesLogs es el id que está en la etiqueta <p> en index.handlebars
    let messages= ""; // Cambio de messagges a messages
    data.forEach(message => {
        messages = messages + `${message.user} dice: ${message.message} <br>`; // <br> es el salto de línea
    });
    log.innerHTML = messages;
});
