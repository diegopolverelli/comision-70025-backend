// const express=require("express")
import express from "express"
// import { HeroesManager } from "./dao/HeroesManager.js";
import { logMidd } from "./middlewares/logMidd.js";
// import { auth } from "./middlewares/auth.js";
// import { heroes } from "./data/heroes.js";
import { router as heroesRouter } from "./routes/heroesRouter.js";
import { router as villanosRouter } from "./routes/villanosRouter.js";

const PORT=3000
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("./src/public"))

app.use(logMidd)

app.use("/api/heroes", heroesRouter)
app.use("/api/villanos", villanosRouter)

app.get("/", (req, res)=>{

    // codigo

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:`Server con Express...!!!`});
})




const server=app.listen(PORT, ()=>{
    console.log(`Server on line en puerto ${PORT}`)
})