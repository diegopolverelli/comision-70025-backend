import express from 'express';
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import fs from 'fs'
import { passportCall, SECRET } from './utils.js';
import { auth } from './middlewares/auth.js';
import passport from 'passport';
import { iniciarPassport } from './config/passport.config.js';
import { router as heroesRouter } from './routes/heroes.router.js';
const PORT = 3000;

const app = express();

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"))
// paso 2)
iniciarPassport()
app.use(passport.initialize())
// sessions no, porque no uso app.use(passport.session()) NO VA...!!!

app.use("/api/heroes", heroesRouter)

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('OK');
})

let usuarios = []
if (fs.existsSync('./src/usuarios.json')) {
    usuarios = JSON.parse(fs.readFileSync('./src/usuarios.json', 'utf-8'))
}

app.post('/registro', (req, res) => {
    let { nombre, email, password } = req.body
    if (!nombre || !email || !password) return res.status(400).send('Ingrese todos los datos')

    let usuario = usuarios.find(u => u.email === email)
    if (usuario) return res.status(400).send(`El usuario ${email} ya existe en la DB`)

    let id = 1
    if (usuarios.length > 0) id = usuarios[usuarios.length - 1].id + 1

    usuario = {
        id, nombre, email, password
    }

    usuarios.push(usuario)

    fs.writeFileSync('./src/usuarios.json', JSON.stringify(usuarios, null, 5))

    res.json({
        usuarioCreado: usuario
    })
})

app.post('/login', (req, res) => {
    let { email, password } = req.body
    if (!email || !password) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Ingrese email y password` })
    }

    // return res.status(400).send('Ingrese email y password')

    usuarios = JSON.parse(fs.readFileSync('./src/usuarios.json', 'utf8'))

    let usuario = usuarios.find(u => u.email === email && u.password === password)
    if (!usuario) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Error credenciales invalidas` })
    }

    // return res.status(400).send(`Error credenciales`)

    usuario = { ...usuario }
    delete usuario.password

    let token = jwt.sign(usuario, SECRET, { expiresIn: "1h" })

    res.cookie("CoderCookie", token, { maxAge: 1000 * 60 * 60, httpOnly: true })
    return res.status(200).json({
        usuarioLogueado: usuario,
        // token
    })

})


// app.get('/usuario', auth, (req,res)=>{
// paso 3)
// app.get('/usuario', passport.authenticate("jwt", { session: false }), (req, res) => {
app.get('/usuario', passportCall("jwt"), (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        mensaje: 'Perfil usuario',
        datosUsuario: req.user
    });
});


// app.get('/protected', function (req, res, next) {
//     passport.authenticate('local', function (err, user, info, status) {
//         if (err) { return next(err) }  // desde passport.config hago un return done(error)
//         if (!user) { return res.redirect('/signin') }   // desde passport.config hago un return done(null, false)
//         res.redirect('/account');   // desde passport.config hago un return done(null, usuario)
//     })(req, res, next);
// });



const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});
