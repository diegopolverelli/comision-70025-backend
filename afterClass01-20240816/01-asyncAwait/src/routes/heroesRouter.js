import { Router } from 'express';
import { HeroesManager } from '../dao/HeroesManager.js';
export const router=Router()

router.get('/',async(req,res)=>{

    let heroes
    try {
        heroes=await HeroesManager.get()
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`${error.message}`})
    }

    res.setHeader('Content-Type','application/json')
    res.status(200).json({heroes})
})