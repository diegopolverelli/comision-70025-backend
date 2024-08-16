import express from 'express';
import { Server } from "socket.io"
let io
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"))


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

io=new Server(server)

setInterval(() => {
    let temperatura=Math.floor(Math.random()*(7)+26)      // Math.floor(Math.random()*(cantNrosAGenerar)+aPartirDelNro)
    io.emit("nuevaLecturaTemperatura", temperatura)
}, 1000);

io.on("connection", socket=>{
    console.log(`Se ha conectado alguien, y le asigne id ${socket.id} `)

    socket.emit("saludo", "Bienvenido...!!! identificate")
    socket.broadcast.emit("nuevoUsuario", `Alguien se conectó, con id ${socket.id}`)

    socket.on("hola", (saludo1, saludo2)=>{
        socket.broadcast.emit("mensaje1", saludo1, saludo2)
    })

})