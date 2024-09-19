import { ordenesModelo } from "./models/ordenesModelo.js";

export class OrdenesDAO{
    static async getOrdenes(){
        return await ordenesModelo
                            .find()
                            .populate("negocio")
                            .populate("usuario")
                            .lean()
    }
    static async create(orden){
        return await ordenesModelo.create(orden)
    }
}