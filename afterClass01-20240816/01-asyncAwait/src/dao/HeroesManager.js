import fs from "fs"

export class HeroesManager{
    static path="./src/data/heroes.json"

    static async get(){
        if(fs.existsSync(this.path)){
            let heroes=JSON.parse(await fs.promises.readFile(this.path, {encoding:"utf-8"}))
            return heroes
        }else{
            throw new Error("Archivo no encontrado...!!!")
        }
    }
}