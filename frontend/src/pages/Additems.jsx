import React from 'react'
import { useState } from 'react'
import api from "../api.js";
import { useNavigate } from 'react-router-dom'
import { Utensils,Package, Hash, Tag, Calendar, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
const Additems = () => {
    const [formData,setFormData]=useState({
        name:"",
        quantity:"",
        category:"",
        expiryDate:""
    })
    const [loading, Setloading] = useState(false)
    const [errors, Seterrors] = useState({})
    const navigate=useNavigate()
    const handlechange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
        if(errors[e.target.name]){
            Seterrors({...errors,[e.target.name]:""})
        }
    }
    const validation=()=>{
        const newErrors={} 
        if(!formData.name.trim()){
            newErrors.name="name input field is required"
        }
        if(!formData.quantity.trim()){
            newErrors.name="quantity input field is required"
        }
        if(!formData.category.trim()){
            newErrors.name="category input field is required"
        }
        if(!formData.expiryDate.trim()){
            newErrors.name="expiryDate input field is required"
        }
        Seterrors(newErrors)
        return Object.keys(newErrors).length===0 //true return when (all inputs fields are filled!!!!!!! no empty message was returned from the object!)
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(!validation()){
            return
        }
        Setloading(true)
        try{
            const token=localStorage.getItem("token")
            const response=await api.post('/api/pantry/add',{
                name:formData.name,
                quantity:formData.quantity,
                category:formData.category,
                expiryDate:formData.expiryDate    
            },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
            toast.success("successfully new item has been added!")
            navigate('/pantry')
        }catch(error){
            console.log(error)
            toast.error(error.response?.data?.message || "couldn't add item")
        }finally{
            Setloading(false)
        }
    }
   return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
            <div className='bg-white shadow-sm rounded-2xl p-8 w-full max-w-md'>
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-1 flex items-center justify-center gap-2">
                     <Utensils/> Add Pantry Item   
                </h2>
                <p className="text-center text-gray-400 text-sm mb-6">Track a new item in your pantry</p>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Product Name</label>
                        <div className="relative">
                            <Package size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name='name'
                                value={formData.name}
                                onChange={handlechange}
                                placeholder='e.g. Milk'
                                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.name ? 'border-red-400' : 'border-gray-200'}`}
                            />
                        </div>
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Quantity</label>
                        <div className="relative">
                            <Hash size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="number"
                                name='quantity'
                                value={formData.quantity}
                                onChange={handlechange}
                                placeholder='e.g. 2'
                                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.quantity ? 'border-red-400' : 'border-gray-200'}`}
                            />
                        </div>
                        {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Category</label>
                        <div className="relative">
                            <Tag size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name='category'
                                value={formData.category}
                                onChange={handlechange}
                                placeholder='e.g. Dairy'
                                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.category ? 'border-red-400' : 'border-gray-200'}`}
                            />
                        </div>
                        {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Expiry Date</label>
                        <div className="relative">
                            <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="date"
                                name='expiryDate'
                                value={formData.expiryDate}
                                onChange={handlechange}
                                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.expiryDate ? 'border-red-400' : 'border-gray-200'}`}
                            />
                        </div>
                        {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-2.5 rounded-lg transition duration-200'
                    >
                        {loading && <Loader2 size={18} className="animate-spin" />}
                        {loading ? "Adding..." : "Add Item"}
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Additems
