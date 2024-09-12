export class UsuariosDTO{
    constructor(usuario){
        this.firstName=usuario.nombre
        this.lastName=usuario.apellido
        this.fullName=`${usuario.nombre} ${usuario.apellido}`
        this.email=usuario.email
        this.role=usuario.rol?usuario.rol:"user"
        this.address=usuario.domicilio
    }
}

// let usuario01=new UsuariosDTO("Mirna", "Lopez")
// console.log(usuario01)