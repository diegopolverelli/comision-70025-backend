import passport from "passport"
import local from "passport-local"
import { UsuariosManagerMongo } from "../dao/UsuariosManagerMONGO.js"
import { generaHash } from "../utils.js"

const usuariosDAO = new UsuariosManagerMongo()

export const initPassport = () => {

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

    passport.serializeUser(function (user, done) {
        return done(null, user._id);
    })

    passport.deserializeUser(async function(id, done) {
        let usuario=await usuariosDAO.getBy({_id:id})
        return done(null, usuario)
    })

}