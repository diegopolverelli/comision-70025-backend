import { config } from "../config/config.js";
import { validaJWT } from "../utils.js";

export const auth=(req, res, next)=>{
    // if(!req.session.usuario){
    //     res.setHeader('Content-Type','application/json');
    //     return res.status(401).json({error:`Unauthorized...!!!`})
    // }
    if(!req.headers.authorization){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Unauthorized...!!!`})
    }

    // Bearer adfasdf88asdf8.asdflkjasdf8asdf
    let token=req.headers.authorization.split(" ")[1]

    try {
        req.user=validaJWT(token, config.SECRET)
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Unauthorized...!!!`, message:`${error.message}`})
    }

    next()
}