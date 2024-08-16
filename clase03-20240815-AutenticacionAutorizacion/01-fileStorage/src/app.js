import express from 'express';
import session from "express-session"
import FileStore from "session-file-store"
const PORT=3000;

const fileStore=FileStore(session)

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret: "CoderCoder123",
    resave: true, 
    saveUninitialized: true,
    store: new fileStore({
        path:"./src/sessions",
        ttl: 1800,
        retries: 0
    })
}))


app.get('/',(req,res)=>{
    if(req.session.visitas){
        req.session.visitas++
    }else{
        req.session.visitas=1
    }


    let saludo=`Hola. Visitas al sitio: ${req.session.visitas}`

    res.setHeader('Content-Type','text/plain');
    res.status(200).send(saludo);
})

app.get("/logout", (req, res)=>{
    req.session.destroy(e=>{
        if(e){
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Error`})
        }

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"Session eliminada...!!!"});
    })
})

app.get("/prueba", (req, res)=>{
    let visitas=req.session.visitas?req.session.visitas:"no definidas"

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:visitas});
})


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
