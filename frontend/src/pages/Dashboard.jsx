import React, { useEffect, useState } from 'react'
import api from "../api.js";
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
    const [items, setItems] = useState([])
    const [recipes, setRecipes] = useState([])
    const navigate = useNavigate()
    const username=localStorage.getItem("name")
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token")
                
                const pantryRes = await api.get('/api/pantry',{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
                     )
                setItems(pantryRes.data.data)

                const recipeRes = await api.post('/api/recipes/suggestions', {}, { 
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                setRecipes(recipeRes.data.results)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])
    const totalItems=items.length
    const expiringSoon=items.filter(item=>{
        const daysLeft=Math.ceil(
            (new Date(item.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)
        )
        return daysLeft >= 0 && daysLeft <= 3
    })
    const expiredItems = items.filter(item =>
        new Date(item.expiryDate) < new Date()
    )
    const getDaysLeft=(expiryDate) => {
        return Math.ceil(
            (new Date(expiryDate) - new Date()) / (1000 * 60 * 60 * 24)
        )
    }
    const getDaysLeftColor = (days) => {
        if (days <= 1) return 'bg-red-100 text-red-600'
        if (days <= 2) return 'bg-orange-100 text-orange-500'
        return 'bg-yellow-100 text-yellow-600'
    }
    return (
        <div className="min-h-screen bg-gray-50 p-8">
           
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                        <span className="text-gray-400">🔍</span>
                        <input
                            type="text"
                            placeholder="Search anything..."
                            className="outline-none text-sm text-gray-600"
                        />
                    </div>
                    <span className="text-xl">🔔</span>
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                            {username ? username.charAt(0).toUpperCase() : "U"}
                        </div>
                        <span className="text-sm font-medium">Hi,{username}</span>
                    </div>
                </div>
            </div>

             {/* Welcome   */}
            <div className="bg-white rounded-2xl p-6 mb-6 flex justify-between items-center shadow-sm">
                <div>
                    <h2 className="text-2xl font-bold mb-1">Welcome back! 👋</h2>
                    <p className="text-gray-500">Here's what's happening in your kitchen today.</p>
                </div>
                <span className="text-6xl">🥗</span>
            </div>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-xl text-2xl">📦</div>
                    <div>
                        <p className="text-3xl font-bold">{totalItems}</p>
                        <p className="text-gray-500 text-sm">Total Items</p>
                        <p className="text-xs text-gray-400">In your pantry</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4">
                    <div className="bg-yellow-100 p-3 rounded-xl text-2xl">⏰</div>
                    <div>
                        <p className="text-3xl font-bold text-yellow-500">{expiringSoon.length}</p>
                        <p className="text-gray-500 text-sm">Expiring Soon</p>
                        <p className="text-xs text-gray-400">Within 3 days</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4">
                    <div className="bg-red-100 p-3 rounded-xl text-2xl">⚠️</div>
                    <div>
                        <p className="text-3xl font-bold text-red-500">{expiredItems.length}</p>
                        <p className="text-gray-500 text-sm">Expired Items</p>
                        <p className="text-xs text-gray-400">Remove them</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-xl text-2xl">👨‍🍳</div>
                    <div>
                        <p className="text-3xl font-bold text-green-600">{recipes.length}</p>
                        <p className="text-gray-500 text-sm">Recipes Found</p>
                        <p className="text-xs text-gray-400">From your items</p>
                    </div>
                </div>
            </div>
            {/* Bottom Section */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Expiring Soon List */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold">Expiring Soon</h2>
                        <button
                            onClick={() => navigate('/pantry')}
                            className="text-green-600 text-sm font-medium hover:underline"
                        >
                            View all
                        </button>
                    </div>
                    {expiringSoon.length === 0 ? (
                        <p className="text-gray-400 text-center py-6">No items expiring soon 🎉</p>
                    ) : (
                        expiringSoon.map(item => (
                            <div key={item._id} className="flex items-center justify-between border-b py-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-2xl">
                                        🥛
                                    </div>
                                    <div>
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-sm text-gray-400">{item.category}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">{item.quantity} units</p>
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDaysLeftColor(getDaysLeft(item.expiryDate))}`}>
                                        {getDaysLeft(item.expiryDate)} day{getDaysLeft(item.expiryDate) !== 1 ? 's' : ''} left
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                    <button
                        onClick={() => navigate('/pantry')}
                        className="mt-4 text-sm text-green-600 font-medium hover:underline w-full text-center"
                    >
                        View All Items →
                    </button>
                </div>

                {/* Recommended Recipe */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold">Recommended Recipe</h2>
                        <button
                            onClick={() => navigate('/recipes')}
                            className="text-green-600 text-sm font-medium hover:underline"
                        >
                            View all
                        </button>
                    </div>

                    {recipes.length === 0 ? (
                        <p className="text-gray-400 text-center py-6">No recipes found</p>
                    ) : (
                        <div>
                            <img
                                src={recipes[0].image}
                                alt={recipes[0].title}
                                className="w-full h-44 object-cover rounded-xl mb-4"
                            />
                            <h3 className="font-bold text-lg mb-1">{recipes[0].title}</h3>
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                                Good Match
                            </span>
                            <p className="text-sm text-gray-500 mt-2 mb-4">
                                You have {recipes[0].usedIngredientCount}/{recipes[0].usedIngredientCount + recipes[0].missedIngredientCount} ingredients
                            </p>
                            <button
                                onClick={() => navigate('/recipes')}
                                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-semibold"
                            >
                                View Recipe
                            </button>
                        </div>
                    )}

                    {/* Tip */}
                    <div className="flex items-start gap-3 mt-6 bg-green-50 p-4 rounded-xl">
                        <span className="text-2xl">💡</span>
                        <div>
                            <p className="font-semibold text-sm">Tips for You</p>
                            <p className="text-xs text-gray-500 mt-1">
                                Store tomatoes at room temperature to keep them fresh for longer.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard