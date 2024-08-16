import express from 'express';
import { generaHash, validaPassword } from './utils.js';
const PORT=3000;
const usuarios=[]
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:usuarios});
})

app.get('/registro',(req,res)=>{

    let {nombre, password}=req.query
    if(!nombre || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete nombre y passport`})
    }

    let existe=usuarios.find(u=>u.nombre===nombre)
    if(existe){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`${nombre} ya está registrado`})
    }

    let nuevoUsuario={
        nombre,
        password: generaHash(password)
    }

    usuarios.push(nuevoUsuario)

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({nuevoUsuario});
})


app.get("/login", (req, res)=>{
    let {nombre, password}=req.query
    if(!nombre || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete nombre y passport`})
    }

    // let usuario=usuarios.find(u=>u.nombre.toLowerCase()===nombre.toLowerCase() && u.password===password)
    let usuario=usuarios.find(u=>u.nombre.toLowerCase()===nombre.toLowerCase())
    if(!usuario){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Credenciales incorrectas`})
    }

    if(!validaPassword(password, usuario.password)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Credenciales incorrectas`})
    }

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Login correcto...!!!"});
})


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
