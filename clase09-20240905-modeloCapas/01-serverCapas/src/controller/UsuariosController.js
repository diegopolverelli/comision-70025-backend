import { UsuariosMemoryDAO } from "../dao/UsuariosMemoryDAO.js"

export default class UsuariosController{

    static async getUsers(req,res){

        let usuarios=await UsuariosMemoryDAO.get()
    
        res.setHeader('Content-Type','application/json')
        res.status(200).json({usuarios})
    }

    static async getUserById(req,res){

        let {id}=req.params

        // let usuarios=await UsuariosMemoryDAO.get()
        let usuario=`usuario ${id}`
    
        res.setHeader('Content-Type','application/json')
        res.status(200).json({usuario})
    }

}