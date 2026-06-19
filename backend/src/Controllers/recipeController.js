import { Pantry } from "../Models/Pantryitems.models.js";
import axios from "axios"
export const getingrediants=async(req,res)=>{
    try{
    //specific user(userid) ke items 
    const items=await Pantry.find({Userid:req.user.id})
    if(items.length===0){
        return res.status(200).json({
            success:true,
            message:"(pantry is empty)",
            results:[]
        })
    }
    
        //Convert the item names into one comma-separated string like "egg,milk,bread".
        const item_names=items.map(item=>item.name).join(',')
        const Apikey=process.env.API_KEY
        const response=await axios.get(
            `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${item_names}&number=5&ranking=1&apiKey=${Apikey}`
        )
        return res.json({
            success: true,
            results: response.data
        })
    } catch(error){
            console.log("full error: ",error)
            return res.status(500).json({
                message:"failed to  fetch recipe ",error:error.message
            })
    }
}
export const getrecipeDetails=async(req,res)=>{
    const recipeId=req.params.id
    const Apikey=process.env.API_KEY
    try {
        const response=await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${Apikey}`)
        return res.json({
            success:true,
            data:response.data
        })
    } catch (error) {
        console.log("recipe detail error: ",error.message)
        return res.status(500).json({
            message:"failed to fetch recipe details",
            error:error.message
        })
    }
}