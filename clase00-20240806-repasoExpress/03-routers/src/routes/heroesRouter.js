import { Router } from 'express';
import { HeroesManager } from '../dao/HeroesManager.js';
import { auth } from '../middlewares/auth.js';
export const router = Router()



// router.get("/", (req, res)=>{})
// router.post("/", (req, res)=>{})
// router.delete("/", (req, res)=>{})

router.get("/", async (req, res) => {

    let respuesta = "lista heroes"
    // respuesta=heroes
    respuesta = await HeroesManager.getHeroe()

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ payload: respuesta });
})

router.get("/:id", (req, res) => {
    let { id } = req.params

    let respuesta = `lista heroe ${id}`

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ payload: respuesta });
})

router.post("/", auth, (req, res, next) => {
    console.log("middleware definido 'on line' a nivel endpoint...!!!")

    next()
}, function (req, res, next) {
    console.log("otro middleware definido 'on line' a nivel endpoint...!!!")
    if (req.body.alias) {
        req.body.alias = req.body.alias.toUpperCase()
    }
    next()

}, (req, res) => {

    console.log(req.body)

    let respuesta = "crea heroe"

    res.setHeader('Content-Type', 'application/json');
    return res.status(201).json({ payload: respuesta });
})

router.put("/:id", async (req, res) => {
    let { id } = req.params
    let heroes = await HeroesManager.getHeroe()
    // validar sobre var. heroes

    // let modifica=await HeroesManager.update(id, aModificar)

    let respuesta = `modifica heroe ${id}`

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ payload: respuesta });
})

router.delete("/:id", (req, res) => {
    let { id } = req.params

    let respuesta = `elimina heroe ${id}`

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ payload: respuesta });
})
