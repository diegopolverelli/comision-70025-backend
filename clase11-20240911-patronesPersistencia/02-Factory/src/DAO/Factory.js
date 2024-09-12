import { config } from "../config/config.js"
import { ConnDB } from "../ConnDB.js"


export let DAO
let PERSISTENCE=config.PERSISTENCE

switch (PERSISTENCE) {
    case "FS":
        // import algo from "./usuariosFsDAO.js"
        let fs=await import("./usuariosFsDAO.js")
        DAO=fs.usuariosFsDAO
        break;
    case "MONGO":
        ConnDB.conectar(config.MONGO_URL, config.DB_NAME)
        let mongo=await import("./UsuariosMongoDAO.js")
        DAO=mongo.UsuariosMongoDAO
        // DAO=(await import("./UsuariosMongoDAO.js")).UsuariosMongoDAO
        // let {UsuariosMongoDAO} = await import("./UsuariosMongoDAO.js")
        // DAO=UsuariosMongoDAO
        break;

    default:
        throw new Error("Persistencia incorrecta... revise variables de entorno...")
        break;
}