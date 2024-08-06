// const express=require("express")
import express from "express"
import { HeroesManager } from "./dao/HeroesManager.js";
// import { heroes } from "./data/heroes.js";

const PORT=3000
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/", (req, res)=>{

    // codigo

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:`Server con Express...!!!`});
})

app.get("/api/heroes", async(req, res)=>{

    let respuesta="lista heroes"
    // respuesta=heroes
    respuesta=await HeroesManager.getHeroe()

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:respuesta});
})

app.get("/api/heroes/:id", (req, res)=>{
    let {id}=req.params

    let respuesta=`lista heroe ${id}`

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:respuesta});
})

app.post("/api/heroes", (req, res)=>{

    let respuesta="crea heroe"

    res.setHeader('Content-Type','application/json');
    return res.status(201).json({payload:respuesta});
})

app.put("/api/heroes/:id", async(req, res)=>{
    let {id}=req.params
    let heroes=await HeroesManager.getHeroe()
    // validar sobre var. heroes

    // let modifica=await HeroesManager.update(id, aModificar)

    let respuesta=`modifica heroe ${id}`

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:respuesta});
})

app.delete("/api/heroes/:id", (req, res)=>{
    let {id}=req.params

    let respuesta=`elimina heroe ${id}`

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:respuesta});
})









const server=app.listen(PORT, ()=>{
    console.log(`Server on line en puerto ${PORT}`)
})