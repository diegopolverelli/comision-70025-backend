import { isValidObjectId } from "mongoose";
import { OrdenesDAO } from "../DAO/OrdenesDAO.js";
import { UsuariosDAO } from "../DAO/usuariosDAO.js";
import { procesaErrores } from "../utils.js";
import { NegociosDAO } from "../DAO/negociosDAO.js";

export default class OrdenesController{
    static getOrdenes=async(req, res)=>{
        try {
            // let ordenes="Listado ordenes"
            let ordenes=await OrdenesDAO.getOrdenes()
            
    
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({ordenes});
        } catch (error) {
            return procesaErrores(res, error)
        }
    }

    static createOrden=async(req, res)=>{

        let orden=req.body
        let {nid, uid, pedido}=orden
        // validaciones x cuenta y orden del alumno...!!!
        if(!nid || !uid){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Complete datos`})
        }

        if(!isValidObjectId(nid) || !isValidObjectId(uid)){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`nid | uid con formato inválido...!!!`})
        }

        try {

            let usuario=await UsuariosDAO.getUsuarioBy({_id:uid})
            if(!usuario){
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({error:`Usuario con id ${uid}`})
            }

            let negocio=await NegociosDAO.getNegocioBy({_id:nid})
            if(!negocio){
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({error:`No existe negocio con id ${nid}`})
            }

            let error=false
            let detalleError=[]
            pedido.forEach(item=>{
                let producto=negocio.productos.find(p=>p.id==item.id)
                if(producto){
                    item.descrip=producto.descrip
                    item.precio=producto.precio
                    item.subtotal=producto.precio*item.cantidad
                }else{
                    error=true
                    detalleError.push(
                        {
                            descrip:`No existe el producto con id ${item.id} en el negocio ${negocio.nombre}`
                        }
                    )
                }
            })

            if(error){
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({error:`Revisar detalle`, detalleError})
            }

            let nroOrden=Date.now()
            let fecha=new Date()
            let total=pedido.reduce((acum, items)=>acum+=items.subtotal, 0)


            // let nuevaOrden="nuevo orden generada, a bar id: "+orden.nid
            let nuevaOrden=await OrdenesDAO.create({
                nroOrden, fecha, total, 
                detalle:pedido, 
                usuario: uid, negocio: nid
            })
            usuario.pedidos.push({
                nroOrden: nuevaOrden._id
            })
            UsuariosDAO.updateUsuario(uid, usuario)

            res.setHeader('Content-Type','application/json');
            return res.status(201).json(nuevaOrden);
        } catch (error) {
            return procesaErrores(res, error)            
        }
    }
}