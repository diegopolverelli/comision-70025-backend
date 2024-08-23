import passport from "passport"
import github from "passport-github2"
import local from "passport-local"
import { UsuariosDAO } from "../dao/UsuariosDAO.js"
import { generaHash, validaPass } from "../utils.js"

export const iniciaPassport=()=>{
    // 1) definir estrategias
    passport.use(   // registro
        "registro",
        new local.Strategy(
            {
                passReqToCallback: true, 
                usernameField: "email"
            },
            async(req, username, password, done)=>{
                try {
                    let {nombre}=req.body
                    if(!nombre){
                        // res.setHeader('Content-Type','application/json');
                        // return res.status(400).json({error:``})
                        console.log("falta nombre")
                        return done(null, false)
                    }
                    // validaciones que requieran...
                    let existe=await UsuariosDAO.getBy({email:username})
                    if(existe){
                        console.log("usuario repetido")
                        return done(null, false)
                    }

                    let nuevoUsuario=await UsuariosDAO.create({
                        nombre, 
                        email: username,
                        password: generaHash(password)
                    })
                    return done(null, nuevoUsuario)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.use(    // login (local)
        "login",
        new local.Strategy(
            {
                usernameField:"email"
            },
            async(username, password, done)=>{
                try {
                    let usuario=await UsuariosDAO.getBy({email:username})
                    if(!usuario || !usuario.password){
                        console.log("usuario invalido o el usuario fue generado por GitHub y no tiene pass...")
                        return done(null, false)
                    }

                    if(!validaPass(password, usuario.password)){
                        console.log("password invalida")
                        return done(null, false)
                    }

                    delete usuario.password
                    return done(null, usuario)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    // http://localhost:3000/api/sessions/callbackGithub
    // clientID  Iv23li31T5vlaYdmaOpb
    // secretClient   0876c66d8c46634e0b83c2cb84569ce56789f885
    passport.use(     // github
        "github", 
        new github.Strategy(
            {
                clientID:"Iv23li31T5vlaYdmaOpb",
                clientSecret:"0876c66d8c46634e0b83c2cb84569ce56789f885",
                callbackURL:"http://localhost:3000/api/sessions/callbackGithub"
            },
            async(t, rt, profile, done)=>{
                try {
                    let {email, name}=profile._json
                    if(!email){
                        return done(null, false)
                    }
                    let usuario=await UsuariosDAO.getBy({email})
                    if(!usuario){
                        usuario=await UsuariosDAO.create({
                            nombre: name, 
                            email, 
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


    // 1') solo si usamos sessions
    // passport.serializeUser((user, done)=>{
    //     return done(null, user)
    // })

    // passport.deserializeUser((user, done)=>{
    //     return done(null, user)
    // })


}