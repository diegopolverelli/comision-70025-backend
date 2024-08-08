import { Router } from 'express';
import { HeroesManager } from '../dao/HeroesManager.js';
import { isValidObjectId } from 'mongoose';
export const router=Router()

router.get('/',async(req,res)=>{

    try {
        let heroes=await HeroesManager.getHeroes()
    
        res.setHeader('Content-Type','application/json')
        res.status(200).json({heroes})
        
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

router.get('/:id',async(req,res)=>{
    let {id}=req.params
    if(!isValidObjectId(id)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`id formato inválido`})
    }

    try {
        let heroe=await HeroesManager.getHeroesBy({_id:id})
        if(heroe){
            res.setHeader('Content-Type','application/json')
            res.status(200).json({heroe})

        }else{
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`No hay heroes con id ${id}`})
        }
        
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

router.post("/", async(req, res)=>{
    let {name, alias}=req.body
    if(!name){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Prop. name es requerida`})
    }

    try {
        let existe=await HeroesManager.getHeroesBy({name})
        if(existe){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`${name} ya existe en DB`})
        }

        let nuevoHeroe=await HeroesManager.createHeroe({name, alias})
        res.setHeader('Content-Type','application/json');
        return res.status(201).json({nuevoHeroe});
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