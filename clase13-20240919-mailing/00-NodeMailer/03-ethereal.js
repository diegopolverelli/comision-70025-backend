// rsah cmax nlsq phoo
import nodemailer from "nodemailer"

const transporter=nodemailer.createTransport(
    {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'yazmin.maggio96@ethereal.email',
            pass: 'MP57Kc3PkRVAWCRa41'
        }
    }
)

const enviarMail=()=>{
    return transporter.sendMail({
        from: "Yazmin Maggio yazmin.maggio96@ethereal.email", 
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