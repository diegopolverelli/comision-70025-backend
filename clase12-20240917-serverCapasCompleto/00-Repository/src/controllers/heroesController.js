// import { MemoryHeroesDAO as DAO } from "../dao/memoryHeroesDAO.js"

import { heroesService } from "../repository/HeroesService.js"

// let heroesService=new DAO()

async function getHeroes(req,res){

    // let heroes=await heroesService.get()
    let heroes=await heroesService.getHeroes()

    res.status(200).json({heroes})
}
async function getHeroeByName(req,res){

    // let heroes=await heroesService.get()
    let heroe=await heroesService.getHeroeByName(req.params.name)

    res.status(200).json({heroe})
}

export default {getHeroes, getHeroeByName}