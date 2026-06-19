import React, { useEffect, useState } from 'react'
import api from "../api.js";
import { useNavigate } from 'react-router-dom'
import { ChefHat,ShoppingCart,CheckCircle,UtensilsCrossed } from 'lucide-react'
const Recipe=()=> {
    const navigate=useNavigate()
    const [recipes,setRecipes]=useState([])
    const [loading,setLoading]=useState(true)
    const fetchRecipes=async()=>{
        try{
            const token=localStorage.getItem("token")
            const response=await api.post(
                '/api/recipes/suggestions',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setRecipes(response.data.results)
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        fetchRecipes()
    }, [])
    if(loading){
        return(
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-8 animate-pulse"></div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i)=>(
                        <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
                            <div className="w-full h-52 bg-gray-200"></div>
                            <div className="p-4">
                                <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                                <div className="h-4 bg-gray-100 rounded w-1/2 mb-2"></div>
                                <div className="h-4 bg-gray-100 rounded w-1/3"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="flex items-center justify-center gap-3 mb-8">
                <ChefHat size={28} className="text-green-600" />
                <h1 className="text-2xl font-bold text-gray-800">Recipe Suggestions</h1>
            </div>
            {recipes.length===0? (
                <div className="bg-white rounded-2xl shadow-sm p-12 flex flex-col items-center text-center">
                    <span className="text-6xl mb-4"><UtensilsCrossed size={60}className="text-gray-400 mb-4"/></span>
                    <h2 className="text-lg font-semibold text-gray-700 mb-1">No recipes found</h2>
                    <p className="text-gray-400 text-sm">Add more items to your pantry to get recipe suggestions.</p>
                </div>
            ):(
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.map((recipe)=>(
                        <div
                            key={recipe.id}
                            onClick={() => navigate(`/recipes/${recipe.id}`)}
                            className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                        >
                            <img
                                src={recipe.image}
                                alt={recipe.title}
                                className="w-full h-52 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-bold text-gray-800 mb-3">{recipe.title}</h2>
                                <div className="flex gap-2">
                                    <span className="bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                                        <CheckCircle size={14} />
                                        {recipe.usedIngredientCount} used
                                    </span>
                                    <span className="bg-orange-100 text-orange-600 text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                                        <ShoppingCart size={14} />
                                        {recipe.missedIngredientCount} missing
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
export default Recipe