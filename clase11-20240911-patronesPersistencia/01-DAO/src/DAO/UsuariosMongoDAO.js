import { usuariosModelo } from "./models/usuariosModelo.js";
console.log("Persistencia en Mongo iniciada")
export class UsuariosMongoDAO{

    async get(){
        return await usuariosModelo.find().lean()
    }
    
    
    async getBy(filtro={}){
        return await usuariosModelo.findOne(filtro).lean()
    }
    
    async create(usuario){
        return await usuariosModelo.create(usuario)
    }
}