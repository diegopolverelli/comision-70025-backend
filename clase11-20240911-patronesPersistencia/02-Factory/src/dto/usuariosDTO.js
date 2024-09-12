export class UsuariosDTO{
    constructor(usuario){
        this.firstName=usuario.nombre.toUpperCase()
        this.email=usuario.email
    }
}