import fs from "fs"

process.on("exit", code=>{
    console.log({code})

    console.log(`Saliendo del script... con code ${code}`)
})

process.on("uncaughtException", error=>{
    console.log(`Ocurrió algo... ${error.message}`)
})

setTimeout(() => {
    console.log(fafafa)
}, 2500);

setTimeout(() => {
    throw new Error("Error de prueba...!!!")
}, 3000);

let contador=0
setInterval(() => {
    contador++
    console.log(contador)
    if(contador==5){
        process.exit(-20)
    }
}, 1000);