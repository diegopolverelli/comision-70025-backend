import { fileURLToPath } from 'url';
import { dirname } from 'path';
import jwt from 'jsonwebtoken'
import passport from 'passport';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const SECRET = "CoderCoder123"
export default __dirname;

export const passportCall = (estrategia) => function (req, res, next) {
    passport.authenticate(estrategia, function (err, user, info, status) {
        if (err) { return next(err) }  // desde passport.config hago un return done(error)
        if (!user) {
            res.setHeader('Content-Type','application/json');
            return res.status(401).json({
                error:`${info.message?info.message:info.toString()}`,
                detalle:`${info.detalle?info.detalle:"-"}`
            })
        }   // desde passport.config hago un return done(null, false)
        // res.redirect('/account');   // desde passport.config hago un return done(null, usuario)
        req.user=user
        return next()
    })(req, res, next);
}


