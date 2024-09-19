import mongoose from "mongoose"
export const connDB=async()=>{
    try {
        await mongoose.connect(
            "mongodb+srv://coderhouse:codercoder2023@cluster0.wpxpupc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        {
            dbName: "comis70025clase12"
        }
        )
        console.log("DB conectada...!!!")
    } catch (error) {
        console.log(`Error al conectar a DB: ${error}`)
    }
}