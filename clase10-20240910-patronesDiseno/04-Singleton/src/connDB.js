import mongoose from "mongoose"


export class ConnDB{
    static #connection=null
    constructor(url){
        mongoose.connect(url)
    }

    static conectar(url){
        if(this.#connection){
            console.log(`Conexión previamente establecida`)
            return this.#connection
        }
        
        this.#connection=new ConnDB(url)
        console.log("DB Online")
        return this.#connection
    }
}