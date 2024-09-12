import { UsuariosDTO } from "./UsuariosDTO.js"

const usuarioFromBody={
    nombre:"Juan",
    email:"juan@test.com",
    apellido:"Martinez",
    domicilio:"calle 777, eadasfasdf"
}

// fullName, firstName... rol
let usuarioParaDB=new UsuariosDTO(usuarioFromBody)
console.log(usuarioParaDB)