import { productModel } from "./models/productModel.js";

export class ProductsMongoDAO{
    static async get(filtro={}){
        return await productModel.find(filtro).lean()
    }

    static async create(product){
        return await productModel.create(product)
    }
}