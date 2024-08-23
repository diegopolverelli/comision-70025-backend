import { Router } from 'express';
import { VillanosDAO } from '../dao/VillanosDAO.js';
import { auth } from '../middlewares/auth.js';
export const router=Router()

router.get('/villanos', auth , async(req,res)=>{

    let villanos=await VillanosDAO.get()

    res.setHeader('Content-Type','text/html')
    res.status(200).render("villanos",{
        villanos
    })
})

router.get('/villano', auth,async(req,res)=>{

    let {name}=req.query
    if(!name){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete name`})
    }

    let villano=await VillanosDAO.getBy({name})

    res.setHeader('Content-Type','text/html')
    res.status(200).render("villano",{
        villano
    })
})