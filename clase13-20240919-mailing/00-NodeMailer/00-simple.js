// rsah cmax nlsq phoo
import nodemailer from "nodemailer"

const transporter=nodemailer.createTransport(
    {
        service: "gmail", 
        port: 587, 
        auth: {
            user: "diegopolverelli@gmail.com", 
            pass: "rsah cmax nlsq phoo"
        }
    }
)

const enviarMail=()=>{
    return transporter.sendMail({
        from: "Diego diegopolverelli@gmail.com", 
        to: "diegopolverelli@hotmail.com, diepol@yahoo.com",
        subject: "Prueba de email simple",
        html:`
<h2>Prueba de email...!!</h2>
<p style="color:red;">Prueba de email...!!</p>
        `
    })
}

let resultado=await enviarMail()
// console.log(resultado)
if(resultado.accepted.length>0){
    console.log(`Mensaje enviado correctamente a ${JSON.stringify(resultado.accepted)}`)
}
if(resultado.rejected.length>0){
    console.log(`Falló el envío a  ${JSON.stringify(resultado.rejected)}`)
}