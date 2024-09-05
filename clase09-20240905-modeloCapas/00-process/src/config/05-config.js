import dotenv from "dotenv"

const mode="prod"
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