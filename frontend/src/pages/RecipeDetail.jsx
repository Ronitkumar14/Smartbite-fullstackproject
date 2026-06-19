import api from "../api.js";
import React from 'react'
import { useState,useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, Users,ChefHat, Heart,Soup  } from 'lucide-react'

const RecipeDetail = () => {
    const {id}=useParams()
    const navigate=useNavigate()
    const [recipe, setrecipe] = useState()
    const [loading, setloading] = useState(true)
    useEffect(() => {
      const fetchRecipeData=async()=>{
        try {
            const token=localStorage.getItem("token")
            setloading(true)
            const response=await api.get(`/api/recipes/${id}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            setrecipe(response.data.data)
        } catch (error) {
            console.log(error)
        }finally{
            setloading(false)
        }
    }
    fetchRecipeData()
    //logic of id?
    }, [id])
    if(loading){
        return(
            <div className="min-h-screen bg-gray-50 p-8 max-w-4xl mx-auto animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-32 mb-6"></div>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="w-full h-64 bg-gray-200"></div>
                    <div className="p-6">
                        <div className="h-8 bg-gray-200 rounded w-2/3 mb-4"></div>
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="h-16 bg-gray-100 rounded-xl"></div>
                            <div className="h-16 bg-gray-100 rounded-xl"></div>
                            <div className="h-16 bg-gray-100 rounded-xl"></div>
                        </div>
                        <div className="h-5 bg-gray-200 rounded w-1/3 mb-3"></div>
                        <div className="grid grid-cols-2 gap-2">
                            {[1,2,3,4].map(i => (
                                <div key={i} className="h-9 bg-gray-100 rounded-lg"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
     if(!recipe){
        return(
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center gap-3">
                <ChefHat size={60} className='text-gray-400 mb-4'/>
                <h1 className="text-xl font-semibold text-gray-700">Recipe not found</h1>
                <button
                    onClick={() => navigate('/recipes')}
                    className="mb-6 text-green-600 font-semibold hover:underline flex items-center gap-2"
                >
                    <ArrowLeft size={18}/>
                    <span> Back to Recipes</span>
                </button>
            </div>
        )
    }
    
  return(
        <div className="min-h-screen bg-gray-50 p-8 max-w-4xl mx-auto">
            <button
                onClick={()=>navigate('/recipes')}
                className="flex items-center gap-2 text-gray-600 hover:text-green-600 font-medium mb-6 transition"
            >
                <ArrowLeft size={18} />
                Back to Recipes
            </button>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-64 object-cover"
                />
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">{recipe.title}</h1>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-gray-50 p-3 rounded-xl text-center">
                            <Clock size={20} className="text-green-600 mx-auto mb-1" />
                            <p className="text-xl font-bold text-gray-800">{recipe.readyInMinutes}</p>
                            <p className="text-xs text-gray-500">Minutes</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-xl text-center">
                            <Users size={20} className="text-green-600 mx-auto mb-1" />
                            <p className="text-xl font-bold text-gray-800">{recipe.servings}</p>
                            <p className="text-xs text-gray-500">Servings</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-xl text-center">
                            <Heart size={20} className="text-green-600 mx-auto mb-1" />
                            <p className="text-xl font-bold text-gray-800">{recipe.healthScore}</p>
                            <p className="text-xs text-gray-500">Health Score</p>
                        </div>
                    </div>
                    <h2 className="text-lg font-bold text-gray-800 mb-3">Ingredients</h2>
                    <ul className="grid grid-cols-2 gap-2 mb-6">
                        {recipe.extendedIngredients.map((ing) => (
                            <li
                                key={ing.id}
                                className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg text-sm text-gray-700"
                            >
                                <Soup size={16} className="text-green-600 shrink-0"/>
                                <span>{ing.original}</span>
                            </li>
                        ))}
                    </ul>

                    <h2 className="text-lg font-bold text-gray-800 mb-3">Instructions</h2>
                    {recipe.analyzedInstructions.length=== 0?(
                        <p className="text-gray-400 text-sm">No instructions available.</p>
                    ):(
                        <ol className="space-y-3">
                            {recipe.analyzedInstructions[0].steps.map((step) => (
                                <li key={step.number} className="flex gap-3">
                                    <span className="bg-green-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                                        {step.number}
                                    </span>
                                    <p className="text-gray-600 text-sm leading-relaxed">{step.step}</p>
                                </li>
                            ))}
                        </ol>
                    )}
                </div>
            </div>
        </div>
    )
}
export default RecipeDetail