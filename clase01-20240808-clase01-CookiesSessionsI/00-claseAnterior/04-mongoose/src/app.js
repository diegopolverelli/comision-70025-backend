import express from 'express';
import mongoose from "mongoose"

import { router as heroesRouter } from './routes/heroes.router.js';
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/heroes", heroesRouter)

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

// mongoose.connect()

const connDB=async()=>{
    try {
        await mongoose.connect(
            "mongodb+srv://coderhouse:codercoder2023@cluster0.wpxpupc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
            {
                dbName: "comis70025clase00", 
            }
        )
        console.log("DB conectada...!!!")
    } catch (error) {
        console.log(`Error al conectar a DB: ${error.message}`)
    }
}
connDB()
