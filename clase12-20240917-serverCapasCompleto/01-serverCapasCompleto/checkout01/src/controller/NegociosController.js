import { procesaErrores } from "../utils.js";

export default class NegociosController{
    static getNegocios=async(req, res)=>{
        try {
            let negocios="Listado negocios"
    
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({negocios});
        } catch (error) {
            return procesaErrores(res, error)
        }
    }

    static createNegocio=async(req, res)=>{

        let negocio=req.body
        // validaciones x cuenta y orden del alumno...!!!

        try {
            let nuevoNegocio="nuevo negocio generado: "+negocio.nombre
            res.setHeader('Content-Type','application/json');
            return res.status(201).json(nuevoNegocio);
        } catch (error) {
            return procesaErrores(res, error)            
        }
    }
}