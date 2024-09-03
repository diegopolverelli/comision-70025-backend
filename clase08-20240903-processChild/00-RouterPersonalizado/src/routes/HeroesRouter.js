import { heroes } from "../data/heroes.js";
import { m1 } from "./normalRouter.js";
import { CustomRouter } from "./router.js";


export class HeroesRouter extends CustomRouter{
    init(){
        this.get("/", ["user", "admin"], m1,(req, res)=>{

            let {nombre}=req.query
            if(nombre==="Juan"){
                return res.badrequest(`Juan no puede acceder a los datos`)
            }

            if(nombre==="Carlos"){
                throw new Error("Carlos es un usuario inválido...")
            }

            return res.success(heroes)
            // res.setHeader('Content-Type','application/json');
            // return res.status(200).json({payload:heroes});
        })

        this.get("/:id", ["admin"], (req, res)=>{

            let {id}=req.params
            id=Number(id)
            if(isNaN(id)){
                return res.badrequest("Formato invalido id")
            }
            let heroe=heroes.find(h=>h.id===id)

            // res.setHeader('Content-Type','application/json');
            // return res.status(200).json({payload:heroe});
            res.success(heroe)
        })

        
        
    }
}