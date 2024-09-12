
const divDatos=document.querySelector("#datos")
const aDatos=document.querySelector("a")

aDatos.addEventListener("click", async(e)=>{
    e.preventDefault()

    try {
        let respuesta=await fetch("http://localhost:3000/datos",{})
        let datos=await respuesta.json()
        console.log(datos)
        divDatos.textContent=JSON.stringify(datos)
    } catch (error) {
        divDatos.textContent="Error... :("
    }
})