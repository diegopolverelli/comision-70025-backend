import { usuariosModelo } from "./models/usuariosModelo.js";

export class UsuariosDAO{
    static async getUsuarios(){
        // return await usuariosModelo.find().populate("pedidos.nroOrden").lean()
        return await usuariosModelo
                        .find()
                        .populate({
                            path: "pedidos.nroOrden",
                            populate:{
                                path: "negocio"
                            }
                        })
                        .lean()
    }
    static async getUsuarioBy(filtro={}){
        return await usuariosModelo.findOne(filtro).lean()
    }
    static async createUsuario(usuario){
        return await usuariosModelo.create(usuario)
    }
    static async updateUsuario(id, usuario){
        return await usuariosModelo.updateOne({_id:id}, usuario)
    }
}