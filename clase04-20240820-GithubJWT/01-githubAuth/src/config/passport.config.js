// clientID: Iv23liPVU5lM6qFKpU1S
// secret: 042431873b86286225c83cfcb1c03a43c12cc328
// callback: http://localhost:3000/api/sessions/callbackGithub
import passport from "passport"
import github from "passport-github2"
// import gmail from "passport-gmail"
import { usuariosModelo } from "../models/usuario.model.js"

// paso 1
export const inicioPassport=()=>{

    passport.use(
        "github",
        new github.Strategy(
            {
                clientID: "Iv23liPVU5lM6qFKpU1S",
                clientSecret: "042431873b86286225c83cfcb1c03a43c12cc328",
                callbackURL: "http://localhost:3000/api/sessions/callbackGithub"
            },
            async(token, refreshtoken, profile, done)=>{
                try {
                    // console.log(profile)
                    let {name, email}=profile._json
                    if(!email){
                        return done(null, false)
                    }
                    let usuario=await usuariosModelo.findOne({email})
                    if(!usuario){
                        usuario=await usuariosModelo.create({
                            nombre:name, email, 
                            profile
                        })
                    }
                    return done(null, usuario)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )


    // pase 1') solo si usamos express-sessions
    passport.serializeUser((usuario, done)=>{
        return done(null, usuario)
    })

    passport.deserializeUser((usuario, done)=>{
        return done(null, usuario)
    })

}