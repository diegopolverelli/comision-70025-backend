import { procesaErrores } from "../utils.js";

export default class UsuariosController{
    static getUsuarios=async(req, res)=>{
        try {
            let usuarios="Listado usuarios"
    
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({usuarios});
        } catch (error) {
            return procesaErrores(res, error)
        }
    }

    static createUsuario=async(req, res)=>{

        let usuario=req.body
        // validaciones x cuenta y orden del alumno...!!!

        try {
            let nuevoUsuario="nuevo usuario generado: "+usuario.email
            res.setHeader('Content-Type','application/json');
            return res.status(201).json(nuevoUsuario);
        } catch (error) {
            return procesaErrores(res, error)            
        }
    }
}