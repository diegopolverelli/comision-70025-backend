
// @decorador(parametro1, parametro2)  // forma habitual de encontrar decoradores (en frameworks)
const suma=(a,b)=>{
    return a+b
}


const decaraLog=funcion=>{
    return (...args)=>{  // ... son op rest
        // agregar la funcionalidad requerida
        console.log(`Se ejecuto la funcion ${funcion.name} el ${new Date().toLocaleDateString()}`)
        return funcion(...args) // ... son op spread
    }
}

const sumaConLog=decaraLog(suma)
console.log(sumaConLog(10,4))

console.log(suma(4,5))
