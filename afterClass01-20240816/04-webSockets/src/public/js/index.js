const socket=io()
const divTemperatura=document.getElementById("temperatura")
const btnBoton=document.getElementById("boton")
socket.on("nuevaLecturaTemperatura", temperatura=>{
    // console.log(`La temperatura del reactor es de °${temperatura}`)
    divTemperatura.textContent=`La temperatura del reactor es de °${temperatura}...!!!!`
})

socket.on("saludo", algo=>{
    console.log(algo)
})

socket.on("nuevoUsuario", aviso=>{
    console.log(aviso)
})

btnBoton.addEventListener("click", e=>{
    e.preventDefault()

    socket.emit("hola", "Hola...!!!", "que tal???")
})

socket.on("mensaje1", (s1, s2)=>{
    console.log(s1, s2)
})