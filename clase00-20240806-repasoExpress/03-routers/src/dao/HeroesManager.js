import { heroes } from "../data/heroes.js";

export class HeroesManager{
    constructor(publica){
        console.log("hola desde el const")
        this.publica=publica
    }

    static async getHeroe(){
        return heroes
    }
}

const hm1=new HeroesManager("Marvel")
console.log(hm1.publica)
const hm2=new HeroesManager("DC")
console.log(hm2.publica)