import { villanos } from "../data/villanos.js";

export class VillanosManager{

    static async getVillanos(){
        return villanos
    }
}