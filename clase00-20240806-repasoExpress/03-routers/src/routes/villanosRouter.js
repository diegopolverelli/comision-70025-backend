import { Router } from 'express';
import { VillanosManager } from '../dao/VillanosManager.js';
// import { villanos } from '../data/villanos.js';
export const router=Router()

router.get('/',async(req,res)=>{

    let respuesta=`Lista villanos`
    // respuesta=villanos
    respuesta=await VillanosManager.getVillanos()

    res.setHeader('Content-Type','application/json')
    res.status(200).json({respuesta})
})

router.post('/',(req,res)=>{

    let villanos=`crea villano`

    res.setHeader('Content-Type','application/json')
    res.status(200).json({villanos})
})