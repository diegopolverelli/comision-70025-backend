import express from 'express';
import session from "express-session"
import MongoStore from "connect-mongo"
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret: "CoderCoder123",
    resave: true, 
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl:"mongodb+srv://coderhouse:codercoder2023@cluster0.wpxpupc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        dbName:"comis70025clase03",
        ttl:1800
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

app.get("/prueba", (req, res)=>{
    let visitas=req.session.visitas?req.session.visitas:"no definidas"

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:visitas});
})


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
