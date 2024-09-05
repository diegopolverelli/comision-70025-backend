import dotenv from "dotenv"
import {Command, Option} from "commander"

const program=new Command()

program.addOption(new Option("-m, --mode <mode>", "mode de ejecución del script").choices(["dev", "prod"]).default("dev"))

program.parse()
const opts=program.opts()
console.log(opts)

// const mode="prod"
const mode=opts.mode
dotenv.config(
    {
        path: mode==="dev"?"./src/.env.dev":"./src/.env.prod", 
        override: true
    }
)

export const config={
    PORT: process.env.PORT || 3001,
    PRUEBA_PORT: process.env.PRUEBA_PORT,
    MONGO_URL: process.env.MONGO_URL,
    DB_NAME: process.env.DB_NAME
}