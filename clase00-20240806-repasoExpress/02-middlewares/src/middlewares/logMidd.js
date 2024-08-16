export const logMidd=(req, res, next)=>{
    console.log(`Peticion realizada el ${new Date().toLocaleDateString()} - metodo: ${req.method} - url: ${req.url}`)

    next()
}