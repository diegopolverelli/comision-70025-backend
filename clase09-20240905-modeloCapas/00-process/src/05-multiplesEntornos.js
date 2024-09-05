
// console.log(process.env.PORT)
// console.log(process.env.PRUEBA_PORT)
// console.log(process.env.DATOS)
// console.log(process.env.SECRET)
// console.log(process.env.MONGO_URL)
// console.log(process.env.DB_NAME)

import express from 'express';
import mongoose from "mongoose"
import { config } from './config/05-config.js';
const PORT=config.PORT;
console.log(config.PRUEBA_PORT)
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});


const connDB=async()=>{
    try {
        await mongoose.connect(
            config.MONGO_URL,
        {
            dbName: config.DB_NAME
        }
        )
        console.log("DB conectada...!!!")
    } catch (error) {
        console.log(`Error al conectar a DB: ${error}`)
    }
}
connDB()