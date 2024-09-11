import { isValidObjectId } from "mongoose"
import { cartService } from "../services/cartService.js"
import { procesaErrores } from "../utils.js"
import { productService } from "../services/productService.js"

export const createCart=async(req,res)=>{
    try {
        let nuevoCart=await cartService.createCart()
        res.setHeader('Content-Type','application/json')
        res.status(201).json({nuevoCart})
    } catch (error) {
        procesaErrores(res, error)
    }
}

export const addProductToCart=async(req, res)=>{
    let {cid, pid}=req.params
    if(!cid || !pid){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`complete pid / cid`})
    }

    if(!isValidObjectId(cid) || !isValidObjectId(pid)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`fomato invalido cid / pid`})
    }

    try {
        let product=await productService.getProductById(pid)
        console.log(product)
        if(!product){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`No existe producto con id ${pid}`})
        }
    
        let cart=await cartService.getCartById(cid)
        if(!cart){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`No existe cart con id ${cid}`})
        }

        let indiceProducto=cart.products.findIndex(p=>p.product._id==pid)
        if(indiceProducto===-1){
            cart.products.push({product:pid, quantity:1})
        }else{
            cart.products[indiceProducto].quantity++
        }

        let cartActualizado=await cartService.updateCart(cid, cart)

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({cartActualizado});
        
    } catch (error) {
        procesaErrores(res, error)        
    }
}