import passport from "passport"
import local from "passport-local"
import { UsuariosManagerMongo } from "../dao/UsuariosManagerMONGO.js"
import { generaHash, validaPassword } from "../utils.js"

const usuariosDAO = new UsuariosManagerMongo()

export const initPassport = () => {
    // 1)
    passport.use(
        "registro",
        new local.Strategy(
            {
                usernameField: "email",
                passReqToCallback: true
            },
            async (req, username, password, done) => {
                try {
                    let { nombre } = req.body
                    if (!nombre) {
                        // res.setHeader('Content-Type','application/json');
                        // return res.status(400).json({error:``})
                        return done(null, false)
                    }

                    let existe = await usuariosDAO.getBy({ email: username })
                    if (existe) {
                        return done(null, false)
                    }

                    // validaciones pertinentes...
                    let nuevoUsuario = await usuariosDAO.create({ nombre, email: username, password: generaHash(password) })
                    return done(null, nuevoUsuario)

                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.use(
        "login",
        new local.Strategy(
            {
                usernameField:"email"
            },
            async(username, password, done)=>{
                try {
                    let usuario=await usuariosDAO.getBy({email:username})
                    if(!usuario){
                        // res.setHeader('Content-Type','application/json');
                        // return res.status(400).json({error:``})
                        return done(null, false)
                    }
                    if(!validaPassword(password, usuario.password)){
                        return done(null, false)
                    }

                    // borrar datos sensibles o confidenciales
                    delete usuario.password
                    return done(null, usuario)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )


    // 1')  // solo configurar si usamos express-session
    passport.serializeUser(function (user, done) {
        return done(null, user._id);
    })

    passport.deserializeUser(async function(id, done) {
        let usuario=await usuariosDAO.getBy({_id:id})
        return done(null, usuario)
    })

}