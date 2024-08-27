import passport from "passport"
import passportJWT from "passport-jwt"
import { SECRET } from "../utils.js"

const buscarToken=(req)=>{
    let token=null

    if(req.cookies.CoderCookie){
        token=req.cookies.CoderCookie
    }

    return token
}

export const iniciarPassport=()=>{

    // 1) definir la estrategia
    passport.use(
        "jwt",
        new passportJWT.Strategy(
            {
                secretOrKey: SECRET,
                jwtFromRequest: new passportJWT.ExtractJwt.fromExtractors([buscarToken])
            },
            async (contenidoToken, done)=>{
                try {
                    if(contenidoToken.nombre==="Juan"){
                        return done(null, false, {message:`El usuario Juan tiene el acceso temporalmente inhabilitado`, detalle:"Contacte al administrador"})
                    }     // null, false
                    return done(null, contenidoToken)  // null, usuario
                } catch (error) {
                    return done(error)   // error
                }
            }
        )
    )

    // 1') configurar serializer / deserializer SOLO SI SESSIONS...!!! No va...

}