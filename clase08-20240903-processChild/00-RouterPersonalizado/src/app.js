import express from 'express';
import { router as normalRouter } from './routes/normalRouter.js';
import { HeroesRouter } from './routes/HeroesRouter.js';
import { SessionsRouter } from './routes/SessionsRouter.js';
import cookieParser from "cookie-parser"

const PORT=3000;

const app=express();
const heroesRouter=new HeroesRouter()
const sessionsRouter= new SessionsRouter()

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use("/api/normal", normalRouter)
app.use("/api/heroes", heroesRouter.getRouter())
app.use("/api/sessions", sessionsRouter.getRouter())

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
