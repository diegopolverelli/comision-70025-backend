// console.log("script OK")
const divOrdenes=document.querySelector("#pedidos")
const enlacePedido=document.querySelector("a")

enlacePedido.addEventListener("click", async(e)=>{
    e.preventDefault()

    // console.log("hola")
    let respuesta=await fetch("http://localhost:3000/api/ordenes")
    let {ordenes}=await respuesta.json()
    console.log(ordenes)
    ordenes.forEach(o=>{
        let p=document.createElement("p")
        p.textContent=`Pedido ${o.nroOrden}: Cliente: ${o.usuario.nombre}; Bar: ${o.negocio.nombre} - TOTAL A PAGAR: ${o.total}`
        let hr=document.createElement("hr")
        document.body.append(p, hr)
    })
})