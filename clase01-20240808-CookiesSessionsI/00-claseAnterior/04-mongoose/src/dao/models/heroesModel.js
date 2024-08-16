import mongoose from "mongoose";

const heroesColl="heroes"
const heroesSchema=new mongoose.Schema(
    {
        name: {
            type: String, 
            unique: true
        }, 
        alias: String
    },
    {
        timestamps: true, 
        // collection:"heroes2021"
    }
)

export const heroesModelo=mongoose.model(heroesColl, heroesSchema)

