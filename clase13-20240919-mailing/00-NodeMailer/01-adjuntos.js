import nodemailer from "nodemailer"

const transporter=nodemailer.createTransport({
    service:"gmail",
    port: 587,
    auth:{
        user: "diegopolverelli@gmail.com", 
        pass: "rsah cmax nlsq phoo"
    }
})

const enviarMail=()=>{
    return transporter.sendMail({
        from: "Diego Polverelli diegopolverelli@gmail.com", 
        to: "diegopolverelli@hotmail.com", 
        subject: "prueba mails con adjuntos",
        html: `Prueba de mail con adjuntos`, 
        attachments: [
            {
                path: "./images/diego10.jpg", 
                filename: "diegote.jpg"
            },
            {
                path: "./images/lio.jpg", 
                filename: "lio1.jpg"
            },
            {
                path: "./images/lio2.jpg", 
                filename: "lio2.jpg"
            },
        ]
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