// import { UsuariosMemoryDAO } from "../dao/UsuariosMemoryDAO.js"

import { usuariosService } from "../services/usuarios.service.js"

export default class UsuariosController{

    static async getUsers(req,res){
        try {
            // let usuarios=await UsuariosMemoryDAO.get()
            let usuarios=await usuariosService.getUsers()
        
            res.setHeader('Content-Type','application/json')
            res.status(200).json({usuarios})
            
        } catch (error) {
            console.log(error);
            res.setHeader('Content-Type','application/json');
            return res.status(500).json(
                {
                    error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                    detalle:`${error.message}`
                }
            )
        }
    }

    static async getUserById(req,res){

        let {id}=req.params

        // let usuarios=await UsuariosMemoryDAO.get()
        let usuario=`usuario ${id}`
    
        res.setHeader('Content-Type','application/json')
        res.status(200).json({usuario})
    }

}