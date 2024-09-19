import express from 'express';
import { uploader } from './utils.js';
import { enviarMail } from './mails.js';
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"))

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

// attachments: [
//     {
//         path: "./images/diego10.jpg", 
//         filename: "diegote.jpg"
//     },
//     {
//         path: "./images/lio.jpg", 
//         filename: "lio1.jpg"
//     },
//     {
//         path: "./images/lio2.jpg", 
//         filename: "lio2.jpg"
//     },
// ]

app.post("/mail", uploader.array("archivos"), async(req, res)=>{

    let {to, subject, message}=req.body
    if(!to || !subject || !message){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete todos los datos`})
    }
    console.log(req.files)
    const adjuntos=[]
    req.files.forEach(archivo=>{
        adjuntos.push(
            {
                path: archivo.path, 
                filename: archivo.filename                
            }
        )
    })

    try {
        let resultado=await enviarMail(to, subject, message, adjuntos)
        let resultadoEnvio={}
        if(resultado.accepted.length>0){
            resultadoEnvio.correctos=resultado.accepted
        }
        if(resultado.rejected.length>0){
            resultadoEnvio.fallidos=resultado.rejected
        }

        // eliminar los adjuntos
        // fs.unlinkSync()
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({resultadoEnvio});
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
    }


})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
