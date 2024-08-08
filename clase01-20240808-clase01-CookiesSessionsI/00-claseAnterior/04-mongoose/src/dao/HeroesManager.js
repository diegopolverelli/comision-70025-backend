import { heroesModelo } from "./models/heroesModel.js";

export class HeroesManager{
    constructor(){}

    static async getHeroes(){
        return await heroesModelo.find().lean()
    }

    static async getHeroesBy(filtro={}){  // {email:"juan@test.com"} o {"name":"Batman", _id:"adfaldfasdf9ada8"}
        return await heroesModelo.findOne(filtro).lean()
    }

    static async createHeroe(heroe){
        return await heroesModelo.create(heroe)
    }
}