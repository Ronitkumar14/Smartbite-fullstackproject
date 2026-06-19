import mongoose from "mongoose";
const connectdb=async()=>{
    try {
        console.log(process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("mongodb connected successfully")
    } catch(error){
        console.log(`connection unsuccessfully due to some error: ${error}`)
    }
}
export default connectdb