const express = require ("express");
const exphbs = require ("express-handlebars");
const socket = require("socket.io");
const app = express();
const PUERTO = 8080;


//middleware
app.use(express.static("./src/public")); // le indica a express que el contenido estatico va a estar en la carpeta public que se encuentra dentro de src

//estos dos middlewares que siguen no los usamos pero los ponemos para acostumbrarnos a que esten porque cuando las aplicaciones crecen suelen usarse y si nos olvidamos de ponerlos genera problemas
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//configuramos handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views","./src/views");


//RUTAS
app.get ("/", (req, res)=>{
    res.render("index")
})

//LISTEN
//guardo una referencia del servidor:
const httpServer= app.listen(PUERTO, ()=>{
    console.log(`Esta aplicación funciona en el puerto ${PUERTO}`);
})

//genero una instancia de socket.io del lado del backend
const io = new socket.Server(httpServer);

let messages = [];  //aca se van a guardar por ahora los mensajes

//establecemos la conexion

io.on("connection",(socket)=>{
    console.log("Nuevo usuario conectado")
    socket.on("message", data=>{
        messages.push(data);

        //emitimos mensaje para el cliente con todo el array de datos
        io.emit("messagesLogs", messages)
    })
} );
