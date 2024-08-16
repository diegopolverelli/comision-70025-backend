const inputNombre=document.getElementById("nombre")
const inputEmail=document.getElementById("email")
const inputPassword=document.getElementById("password")
const btnSubmit=document.getElementById("btnSubmit")

btnSubmit.addEventListener("click", async(e)=>{
    e.preventDefault()
    let nombre=inputNombre.value.trim()
    let email=inputEmail.value.trim()
    let password=inputPassword.value.trim()

    if(!nombre || !email || !password){
        alert("Complete los datos...!!!")
        return 
    }

    let body=JSON.stringify({
        nombre, 
        email, 
        password
    })

    let respuesta=await fetch("/api/sessions/registro", {
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body
    })

    let datos=await respuesta.json()
    if(respuesta.status===201){
        location.href=`/login?mensaje=Registro correcto para ${email}...!!!`
    }else{
        alert(datos.error)
    }

})
