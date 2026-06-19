import mongoose from "mongoose";
const connectdb=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("mongodb connected successfully")
    } catch(error){
        console.log(`connection unsuccessfully due to some error: ${error}`)
    }
}
export default connectdb