import { Router } from 'express';
import { auth } from '../middleware/auth.js';
export const router=Router()

router.get('/',(req,res)=>{

    res.status(200).render('home',{
        titulo:"Home Page prueba Login...!!!"
    })
})

router.get('/perfil', auth, (req,res)=>{

    res.status(200).render('perfil100',{

    })
})

router.get('/registro', (req,res)=>{

    res.status(200).render('registro',{

    })
})

router.get('/login', (req,res)=>{

    res.status(200).render('login',{

    })
})

