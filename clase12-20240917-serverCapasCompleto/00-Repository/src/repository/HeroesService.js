import { MemoryHeroesDAO as DAO } from "../dao/memoryHeroesDAO.js"
import { HeroesDTO } from "../DTO/HeroesDTO.js"

class HeroesService{
    constructor(dao){
        this.heroesDAO=dao
    }

    async getHeroes(){
        let heroes=await this.heroesDAO.get()
        heroes=heroes.map(heroe=>new HeroesDTO(heroe))
        return heroes
    }

    async getHeroeByName(name){
        let heroes=await this.heroesDAO.get()
        let heroe=heroes.find(h=>h.name.toLowerCase()===name.toLowerCase())
        return new HeroesDTO(heroe)
    }
}

export const heroesService=new HeroesService(new DAO())