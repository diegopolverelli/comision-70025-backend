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
        subject: "prueba mails con adjuntos incrustados",
        html: `Prueba de mail con adjuntos incrustados...
<br>
<img src="cid:imagen1" width="300">
<img src="cid:foto2" width="300">
<img src="cid:imagen3" width="300">

        `, 
        attachments: [
            {
                path: "./images/diego10.jpg", 
                filename: "diegote.jpg",
                cid: "imagen1"
            },
            {
                path: "./images/lio.jpg", 
                filename: "lio1.jpg",
                cid: "foto2"
            },
            {
                path: "./images/lio2.jpg", 
                filename: "lio2.jpg",
                cid: "imagen3"
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