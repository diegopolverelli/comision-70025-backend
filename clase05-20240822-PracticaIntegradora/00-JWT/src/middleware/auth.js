import jwt from "jsonwebtoken"
import { SECRET } from "../utils.js";

export const auth=(req, res, next)=>{
    // if(!req.session.usuario){
    if(!req.headers.authorization){

        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Unauthorized`})
    }

    let usuario
    // Bearer adsfasdf8asd8fasdk.asdlfkasldkjfasdf9.
    let token=req.headers.authorization.split(" ")[1]
    try {
        usuario=jwt.verify(token, SECRET)
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Unauthorized`, descrip:`${error.message}`})
    }

    req.user=usuario

    next()
}