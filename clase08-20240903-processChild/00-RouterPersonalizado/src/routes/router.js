import {Router} from "express"
import jwt from "jsonwebtoken"

export class CustomRouter{
    #router
    constructor(){
        this.#router=Router()
        this.init()
    }

    init(){}

    getRouter(){
        return this.#router
    }

    get(ruta, permisos, ...funciones){   // los ... son el operador rest
        // this.#router.get(ruta, this.misRespuestas, funciones)
        this.#router.get(ruta, this.misRespuestas, this.auth(permisos), this.procesaCaallbacks(funciones))
    }

    
    post(ruta, permisos, ...funciones){   // los ... son el operador rest
        // this.#router.get(ruta, this.misRespuestas, funciones)
        this.#router.post(ruta, this.misRespuestas, this.auth(permisos), this.procesaCaallbacks(funciones))
    }

    put(ruta, permisos, ...funciones){   // los ... son el operador rest
        // this.#router.get(ruta, this.misRespuestas, funciones)
        this.#router.put(ruta, this.misRespuestas, this.auth(permisos), this.procesaCaallbacks(funciones))
    }

    delete(ruta, permisos, ...funciones){   // los ... son el operador rest
        // this.#router.get(ruta, this.misRespuestas, funciones)
        this.#router.delete(ruta, this.misRespuestas, this.auth(permisos), this.procesaCaallbacks(funciones))
    }

    procesaCaallbacks=funciones=>{
        return funciones.map(fn=>async(...params)=>{  // (req, res, next)
            try {
                return await fn(...params)
            } catch (error) {
                params[1].internalerror(error.message)
            }
        })
    }

    // (a,b)=>a+b  devuelvo  async(a, b)=>{
    //     try {
    //         return a+b
    //     } catch (error) {
            
    //     }    
    // }

    misRespuestas=(req, res, next)=>{
        res.success=datoRespuesta=>res.status(200).json({
            status:"OK", 
            fecha:new Date().toLocaleDateString(),
            payload:datoRespuesta
        })

        res.badrequest=error=>res.status(400).json({
            status:"Bad Request", error,
            fecha:new Date().toLocaleDateString(),
        })

        res.unauthorized=error=>res.status(401).json({
            status:"unauthorized", error
        })

        res.forbidden=error=>res.status(403).json({
            status:"forbidden", error
        })

        res.internalerror=error=>res.status(500).json({
            status:"Internal server error", error
        })

        next()
    }

    auth=(permisos=[])=>{   // auth["public"]    auth(["admin", "PREMIUM"])
        return (req, res, next)=>{
            if(!Array.isArray(permisos)){
                return res.internalerror("Error en permisos de la ruta")
            }
            permisos=permisos.map(p=>p.toLowerCase())
            if(permisos.includes("public")){
                return next()
            }
            console.log(req.cookies)
            if(!req.cookies.CoderCookie){
                return res.unauthorized("No hay usuarios autenticados")
            }
            let token=req.cookies.CoderCookie
            let usuario
            try {
                usuario=jwt.verify(token, "CoderCoder123")
            } catch (error) {
                return res.unauthorized(error.message)
            }
            if(!permisos.includes(usuario.rol.toLowerCase())){
                return res.forbidden("No tiene privilegios suficientes para acceder al recurso solicitado")
            }
            return next()

        }
    }

}