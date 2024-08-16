import { Router } from 'express';
import crypto from "crypto"
import { UsuariosManagerMongo } from '../dao/UsuariosManagerMONGO.js';
import passport from 'passport';
export const router=Router()

const usuariosDAO=new UsuariosManagerMongo()

// router.post('/registro',async(req,res)=>{

//     let {nombre, email, password}=req.body
//     if(!nombre || !email || !password){

//         res.setHeader('Content-Type','application/json');
//         return res.status(400).json({error:`Complete todos los datos...!!!`})
//     }
//     console.log(email)
//     // validaciones pertinentes...
//     try {
//         let existe=await usuariosDAO.getBy({email})
//         // console.log(existe)
//         if(existe){
//             // return res.redirect("/registro?mensaje=Usuario ya existe...")

//             res.setHeader('Content-Type','application/json');
//             return res.status(400).json({error:`Ya existe un usuario con email ${email}`})
//         }
        
//         password=crypto.createHmac("sha256","CoderCoder123").update(password).digest("hex")

//         let nuevoUsuario=await usuariosDAO.create({nombre, email, password})
//         console.log(nuevoUsuario)
//         res.setHeader('Content-Type','application/json')
//         res.status(201).json({nuevoUsuario})
//     } catch (error) {
//         console.log(error);
//         res.setHeader('Content-Type','application/json');
//         return res.status(500).json(
//             {
//                 error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
//                 detalle:`${error.message}`
//             }
//         )
//     }

// })

router.get("/error", (req, res)=>{
    res.setHeader('Content-Type','application/json');
    return res.status(400).json({error:`Error al autenticar con passport`})
})

router.post("/registro", passport.authenticate("registro", {failureRedirect:"/api/sessions/error"}), async(req, res)=>{

    let nuevoUsuario=req.user
    res.setHeader('Content-Type','application/json')
    res.status(201).json({nuevoUsuario})
})

router.post("/login", async(req, res)=>{
    let {email, password}=req.body
    if(!email || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete los datos`})
    }

    password=crypto.createHmac("sha256","CoderCoder123").update(password).digest("hex")

    try {
        let usuario=await usuariosDAO.getBy({email, password})
        if(!usuario){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Credenciales invalidas`})
        }

        delete usuario.password
        req.session.usuario=usuario

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"Login exitoso", usuario});
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

router.get("/logout", (req, res)=>{
    req.session.destroy(error=>{
        if(error){
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Error en logout`})
        }

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"Logout exitoso"});
    })
})