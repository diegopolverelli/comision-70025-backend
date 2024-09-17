import mongoose from "mongoose";

export const ordenesModelo=mongoose.model(
    "ordenes",
    new mongoose.Schema(
        {
            nroOrden: String, 
            fecha: Date, 
            total: Number, 
            usuario: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "usuarios"
            },
            negocio: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "negocios"
            },
            detalle:{
                type:[
                    {
                        id: Number, 
                        descrip: String, 
                        precio: Number, 
                        subtotal: Number,
                        cantidad: Number
                    }
                ]
            }
        },
        {
            timestamps:true
        }
    )
)