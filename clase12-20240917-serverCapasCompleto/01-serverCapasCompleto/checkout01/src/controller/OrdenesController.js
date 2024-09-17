import { procesaErrores } from "../utils.js";

export default class OrdenesController{
    static getOrdenes=async(req, res)=>{
        try {
            let ordenes="Listado ordenes"
    
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({ordenes});
        } catch (error) {
            return procesaErrores(res, error)
        }
    }

    static createOrden=async(req, res)=>{

        let orden=req.body
        // validaciones x cuenta y orden del alumno...!!!

        try {
            let nuevaOrden="nuevo orden generada, a bar id: "+orden.nid
            res.setHeader('Content-Type','application/json');
            return res.status(201).json(nuevaOrden);
        } catch (error) {
            return procesaErrores(res, error)            
        }
    }
}