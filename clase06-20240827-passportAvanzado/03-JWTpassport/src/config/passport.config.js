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
                    return done(null, contenidoToken)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    // 1') configurar serializer / deserializer SOLO SI SESSIONS...!!! No va...

}