// import { UsuariosMemoryDAO as DAO } from "../dao/UsuariosMemoryDAO.js"
import { UsuariosMongoDAO as DAO} from "../dao/UsuariosMongoDAO.js"

class UsuariosService{
    constructor(dao){
        this.dao=dao
    }

    async getUsers(){
        return await this.dao.get()
    }


}


export const usuariosService = new UsuariosService(DAO)