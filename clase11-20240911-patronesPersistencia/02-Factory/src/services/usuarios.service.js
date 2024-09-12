// import { usuariosFsDAO as DAO } from "../DAO/usuariosFsDAO.js";
// import { UsuariosMongoDAO as DAO } from "../DAO/UsuariosMongoDAO.js";
import { DAO } from "../DAO/Factory.js"
import { UsuariosDTO } from "../dto/usuariosDTO.js"

class UsuariosService{
    constructor(dao){
        this.dao=new dao()
    }

    async getUsers(){
        let usuarios=await this.dao.get()
        usuarios=usuarios.map(u=>new UsuariosDTO(u))
        return usuarios
    }

    async getUserById(id){
        return await this.dao.getBy({_id:id})
    }

    async getUserByEmail(email){
        return await this.dao.getBy({email})
    }

    async createUser(nombre, email){

        return await this.dao.create({nombre, email})

    }
}

export const usuariosService=new UsuariosService(DAO)