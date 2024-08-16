import express from 'express';
import { uploader } from './utils.js';
import fs from "fs"
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

app.post("/heroes", uploader.single("foto"), (req, res)=>{

    let {name}=req.body
    let {path, mimetype}=req.file
    let tipo=mimetype.split("/")
    console.log(tipo)
    if(tipo[0]!=="image"){
        fs.unlinkSync(path)
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Solo se permite subir imagenes`})
    }
    
    // grabar en DB la info... o lo que se requira realizar

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:{
        name, path, mimetype
    }});

})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
