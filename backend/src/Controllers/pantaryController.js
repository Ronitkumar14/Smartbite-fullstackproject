import { Pantry } from "../Models/Pantryitems.models.js";
export const postpantry=async(req,res)=>{
    try{ 
        const {name,quantity,category,expiryDate}=req.body
        const pantry_db=await Pantry.create({
            name,quantity,category,expiryDate,
            Userid:req.user.id
        })
        return res.status(201).json({
            success:true,
            data:pantry_db,
        })
    }catch(error){
       console.log(error)
       return res.status(500).json({message: "server error" }) 
    }
}
export const getpantry=async(req,res)=>{
    try{
        const pantary=await Pantry.find(
            {Userid:req.user.id}
        )
        res.status(200).json({
            sucess:true,
            data:pantary
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({ message: "server error" })
    }
}
export const getsinglepantry=async(req,res)=>{
    try{
        const item=await Pantry.findOne({
            //in db (_id used) 
            _id:req.params.id,
            Userid:req.user.id
        })
        if(!item){
            return res.status(404).json({ 
            message: "item not found or unauthorized" 
        })
        }
        return res.status(200).json({
            success:true,
            data:item
    })
    }catch (error) {
        console.log(error)
        return res.status(500).json({message: "server error" })
    }
}
export const updatepantry=async(req,res)=>{
    //url se ik id milegi for update!
    try{
        const itemid=req.params.id
        const {name,category,quantity,expiryDate}=req.body
        const updateditemdata=await Pantry.findOneAndUpdate({
            _id:itemid,Userid:req.user.id},{name,quantity,category,expiryDate:expiryDate? new Date(expiryDate): undefined},
            //new true krne se mtlab he k ab data updated return kro!!
            {new:true}
        )
        if(!updateditemdata){
        return res.status(404).json({ 
            message: "item not found or unauthorized" 
        })
    }
        res.status(200).json({
            success:true,
            data:updateditemdata
        })
    }catch (error) {
        console.log(error)
        return res.status(500).json({ message: "server error" })
    }
}
export const deletepantry=async(req,res)=>{
    try{
        const itemid=req.params.id
        const deleteditem=await Pantry.findOneAndDelete({
            _id:itemid, //condition 1: item must have this ID
            Userid:req.user.id //condition 2: item must belong to THIS user(jis user ne item add kiya tha wo he user delete kr skte he item ko!!)
        })
        if(!deleteditem){
        return res.status(404).json({ 
            message: "item not found or unauthorized" 
        })
    }
        res.status(200).json({
            success:true,
            message:`item has been removed with the id: ${itemid}`
        })
    }catch (error) {
        console.log(error)
        return res.status(500).json({message: "server error" })
    }
}
