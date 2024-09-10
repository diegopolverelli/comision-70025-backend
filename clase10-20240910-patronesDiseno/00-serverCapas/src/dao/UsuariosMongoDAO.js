import { usuariosModelo } from "./models/usuariosModel.js";

export class UsuariosMongoDAO{

    static async get(){
        return await usuariosModelo.find().lean()
    }

    static async create(user){
        return await usuariosModelo.create(user)
    }
}