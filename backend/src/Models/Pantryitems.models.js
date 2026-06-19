import mongoose from "mongoose";
const pantrySchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    expiryDate:{
        type:Date,
        required:true
    },
    Userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    }
},{timestamps:true})
//function calculate the expiryDate


// virtual -->(db ma daysleft ki key store abhi ke liye nhi ho rhi!)
pantrySchema.virtual('daysleft').get(function(){
    //convert string format into date format
    const expiry=new Date(this.expiryDate)
    // this.expiryDate--->(product expiry_date) and new Date()---> currently date!
    const diff_time=this.expiryDate-new Date() //diif_time ke andr value miliseconds ke andr aaegi
    // ceil function--> roundoff krta!!!
    return Math.ceil(diff_time/(1000 * 60 * 60 * 24))
})
//virtual ma se data ab db ma store hogi key value ki form ma in JSON
pantrySchema.set('toJSON',{virtuals:true})
export const Pantry=mongoose.model("Pantry",pantrySchema)
