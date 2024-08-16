const inputEmail=document.getElementById("email")
const inputPassword=document.getElementById("password")
const btnSubmit=document.getElementById("btnSubmit")

btnSubmit.addEventListener("click", async(e)=>{
    e.preventDefault()
    let email=inputEmail.value.trim()
    let password=inputPassword.value.trim()

    if(!email || !password){
        alert("Complete los datos...!!!")
        return 
    }

    let body=JSON.stringify({
        email, 
        password
    })

    let respuesta=await fetch("/api/sessions/login", {
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body
    })

    let datos=await respuesta.json()
    if(respuesta.status===200){
        location.href=`/perfil`
    }else{
        alert(datos.error)
    }

})
