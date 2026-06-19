import React from 'react'
import { useState,useEffect} from 'react';
import { useParams,useNavigate } from 'react-router-dom'
import api from "../api.js";
import {Pencil, Package, Hash, Tag, Calendar, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast';
const Edititem = () => {
    //params always return an object
    const {id}=useParams();
    const navigate=useNavigate()
    const [formData,setformData]=useState({
        name:"",
        quantity:"",
        category:"",
        expiryDate:""
    })
    const [errors, seterrors] = useState({})
    const [pageloading, setpageloading] = useState(true) //initially data ko load kiya jaega!!
    const [submiting, setsubmiting] = useState(false)
    const handlechange=(e)=>{
        setformData({...formData,[e.target.name]:e.target.value})
        if(errors[e.target.name]){
            seterrors({...errors,[e.target.name]:""})
        }
    }
    const getsingleItem=async()=>{
        try {
            setpageloading(true)
            const token=localStorage.getItem("token")
            const response=await api.get(`/api/pantry/${id}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            const itemsdata=response.data.data
            setformData({
                name:itemsdata.name,
                category:itemsdata.category,
                quantity:itemsdata.quantity,
                expiryDate:itemsdata.expiryDate? itemsdata.expiryDate.split("T")[0]:""
            })
        } catch(error){
            console.log(error)
            toast.error("couldn't load item")
        }finally{
            setpageloading(false)
        }
    }
    useEffect(() => {
      getsingleItem()
    }, [])
    const validate=()=>{
        const newErrors = {}
        if(!formData.name.trim()){
            newErrors.name="name input field is required"
        }
        if(!formData.quantity){
            newErrors.quantity = "quantity input field is required"
        }
        else if(formData.quantity<=0){
            newErrors.quantity="Quantity must be greater than 0"
        }
        if(!formData.category.trim()){
            newErrors.category="category input field is required"
        }
        if(!formData.expiryDate){
            newErrors.expiryDate="expiry date input field is required"
        }
        seterrors(newErrors)
        return Object.keys(newErrors).length === 0
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(!validate()){
            return
        }
        setsubmiting(true)
        try{
            const token=localStorage.getItem("token")
            const response=await api.put(`/api/pantry/update/${id}`,{
                name:formData.name,
                quantity:formData.quantity,
                category:formData.category,
                expiryDate:formData.expiryDate
            },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            toast.success('successfully item updated')
            navigate('/pantry')
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "couldn't update item")
        }finally{
            setsubmiting(false)
        }
    }
    if(pageloading){
        return (
            <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                <div className="bg-white shadow-sm rounded-2xl p-8 w-full max-w-md animate-pulse">
                    <div className="h-7 bg-gray-200 rounded w-1/2 mx-auto mb-6"></div>
                    <div className="h-11 bg-gray-100 rounded-lg mb-4"></div>
                    <div className="h-11 bg-gray-100 rounded-lg mb-4"></div>
                    <div className="h-11 bg-gray-100 rounded-lg mb-4"></div>
                    <div className="h-11 bg-gray-100 rounded-lg mb-4"></div>
                    <div className="h-11 bg-gray-200 rounded-lg"></div>
                </div>
            </div>
        )
    }
   return(
        <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4">
            <div className="bg-white shadow-sm rounded-2xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-1 flex items-center justify-center gap-2">
                    <Pencil size={20}/> Edit Pantry Item
                </h1>
                <p className="text-center text-gray-400 text-sm mb-6">Update the details of this item</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Product Name</label>
                        <div className="relative">
                            <Package size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handlechange}
                                placeholder="Product Name"
                                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.name ? 'border-red-400' : 'border-gray-200'}`}
                            />
                        </div>
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Quantity</label>
                        <div className="relative">
                            <Hash size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handlechange}
                                placeholder="Quantity"
                                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.quantity ? 'border-red-400' : 'border-gray-200'}`}
                            />
                        </div>
                        {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Category</label>
                        <div className="relative">
                            <Tag size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handlechange}
                                placeholder="Category"
                                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.category ? 'border-red-400' : 'border-gray-200'}`}
                            />
                        </div>
                        {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Expiry Date</label>
                        <div className="relative">
                            <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="date"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handlechange}
                                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.expiryDate ? 'border-red-400' : 'border-gray-200'}`}
                            />
                        </div>
                        {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={submiting || pageloading}
                        className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-2.5 rounded-lg transition duration-200"
                    >
                        {submiting && <Loader2 size={18} className="animate-spin" />}
                        {submiting ? "Updating..." : "Update Item"}
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Edititem
