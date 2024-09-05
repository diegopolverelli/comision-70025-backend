// console.log(process.argv, " - argv")

let [nodePath, scriptPath, ...argumentos]=process.argv  // ... son operador rest
// let {}=process.env

// console.log(argumentos)

if(argumentos.includes("--help")){
    console.log(`Instrucciones de uso: --port... etc..`)
}


if(argumentos.includes("--port")){
    let pos=argumentos.findIndex(a=>a==="--port")
    console.log(`Server escuchando en puerto ${argumentos[pos+1]}`)
}

if(argumentos.includes("--username")){
    let pos=argumentos.findIndex(a=>a==="--username")
    console.log(`Usuario ejecutando script: ${argumentos[pos+1]}`)
}