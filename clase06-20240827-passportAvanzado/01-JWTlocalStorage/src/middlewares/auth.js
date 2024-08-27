import jwt from "jsonwebtoken"
import { SECRET } from "../utils.js";

export const auth=(req, res, next)=>{
    if(!req.headers.authorization){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`No hay token disponible`})
    }

    // Bearer asdflkjasdf.asdf9a8sdf9.asdfasdfasdf
    let token=req.headers.authorization.split(" ")[1]

    try {
        let usuario=jwt.verify(token, SECRET)
        req.user=usuario
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`${error.message}`})
    }

    next()
}