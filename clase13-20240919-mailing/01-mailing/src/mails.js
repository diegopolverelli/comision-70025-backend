import nodemailer from "nodemailer"

const transporter=nodemailer.createTransport({
    service:"gmail",
    port: 587,
    auth:{
        user: "diegopolverelli@gmail.com", 
        pass: "rsah cmax nlsq phoo"
    }
})

export const enviarMail=(to, subject, message, adjuntos=[])=>{
    return transporter.sendMail({
        from: "Diego Polverelli diegopolverelli@gmail.com", 
        to, 
        subject,
        html: message, 
        attachments: adjuntos
    })
}

