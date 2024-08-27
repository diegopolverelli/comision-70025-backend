import express from 'express';
import jwt from "jsonwebtoken"
import fs from 'fs'
import { SECRET } from './utils.js';
import { auth } from './middlewares/auth.js';
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"))

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

let usuarios=[]
if(fs.existsSync('./src/usuarios.json')){
    usuarios=JSON.parse(fs.readFileSync('./src/usuarios.json','utf-8'))
}

app.post('/registro',(req,res)=>{
    let {nombre, email, password}=req.body
    if(!nombre || !email || !password) return res.status(400).send('Ingrese todos los datos')

    let usuario=usuarios.find(u=>u.email===email)
    if(usuario) return res.status(400).send(`El usuario ${email} ya existe en la DB`)

    let id=1
    if(usuarios.length>0) id=usuarios[usuarios.length-1].id+1

    usuario={
        id, nombre, email, password
    }

    usuarios.push(usuario)

    fs.writeFileSync('./src/usuarios.json',JSON.stringify(usuarios,null,5))

    res.json({
        usuarioCreado:usuario
    })
})

app.post('/login',(req,res)=>{
    let {email, password}=req.body
    if(!email || !password) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Ingrese email y password`})
    }
        
        // return res.status(400).send('Ingrese email y password')

    usuarios=JSON.parse(fs.readFileSync('./src/usuarios.json','utf8'))

    let usuario=usuarios.find(u=>u.email===email && u.password===password)
    if(!usuario) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Error credenciales invalidas`})
    }
        
        // return res.status(400).send(`Error credenciales`)

    usuario={...usuario}
    delete usuario.password

    let token=jwt.sign(usuario, SECRET, {expiresIn: "1h"})

    return res.status(200).json({
        usuarioLogueado:usuario,
        token
    })

})

app.get('/usuario', auth, (req,res)=>{


    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        mensaje:'Perfil usuario',
        datosUsuario:req.user
    });
});

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
