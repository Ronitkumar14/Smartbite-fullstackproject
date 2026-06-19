import React from 'react'
import api from "../api.js";
import { useState,useEffect } from 'react'
import {useNavigate } from 'react-router-dom'
import { Pencil, Trash2, Plus, PackageOpen } from 'lucide-react'
import toast from 'react-hot-toast'
const Pantry = () => {
    const [item, setitem] = useState([])
    const [loading, setloading] = useState(true)
    const navigate=useNavigate()
    const pantryitems=async()=>{
        try {
            const token=localStorage.getItem("token")
            const response=await api.get('/api/pantry',{
                    headers:{
                        Authorization:`Bearer ${token}`
                }
            }
        )
            setitem(response.data.data)
            setloading(false)
        } catch (error) {
            console.log(error)
        }  
    }
    useEffect(()=>{
          pantryitems()
        }, [])
    const deleteitem=async(id)=>{
        try{
            const token=localStorage.getItem("token")
            await api.delete(`/api/pantry/delete/${id}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success('Item deleted')
            // alert('data successfully deleted')
            pantryitems() //manually call the function to update the state where the component will re-render 
        } 
        catch(error){
            console.log(error)
            toast.error("couldn't delete item")
            setloading(false)
        }
    }
    const getDaysLeft=(expiryDate)=>{
        return Math.ceil(
            (new Date(expiryDate) - new Date()) / (1000 * 60 * 60 * 24)
        )
    }
    const getStatusBadge=(expiryDate)=>{
        const days=getDaysLeft(expiryDate)
        if(days<0){
            return { label: 'Expired', className: 'bg-red-100 text-red-600' }
        }
        if(days<=1){
            return { label: `${days} day left`, className: 'bg-red-100 text-red-600' }
        }
        if(days<=3){
            return { label: `${days} days left`, className: 'bg-orange-100 text-orange-500' }
        }
        if(days<=7){
            return { label: `${days} days left`, className: 'bg-yellow-100 text-yellow-600' }
        }
        return { label: `${days} days left`, className:'bg-green-100 text-green-600' }
    }
    if(loading){
        return(
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Pantry Items</h1>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                     {/* 6 fake "skeleton cards" dikhata hai jo pulse (halki halki blink) karti */}
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white p-5 rounded-2xl shadow-sm animate-pulse">
                            <div className="h-6 bg-gray-200 rounded w-2/3 mb-3"></div>
                            <div className="h-4 bg-gray-100 rounded w-1/2 mb-2"></div>
                            <div className="h-4 bg-gray-100 rounded w-1/3 mb-4"></div>
                            <div className="h-8 bg-gray-100 rounded w-1/3"></div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-2xl font-bold text-gray-800'>Pantry-Items</h1>
        <button onClick={()=>navigate('/additem')} className='flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition'>
            <Plus size={18}/>
            Add Item</button>
      </div>
      <div className='grid md:grid-cols-3 gap-6'>
        {item.length===0? (
            <div className="bg-white rounded-2xl shadow-sm p-12 flex flex-col items-center text-center">
        <PackageOpen size={48} className="text-gray-300 mb-4" />
        <h2 className="text-lg font-semibold text-gray-700 mb-1">Your pantry is empty</h2>
        <p className="text-gray-400 text-sm mb-6">Add your first item to start tracking expiry dates and get recipe suggestions.</p>
        <button onClick={() => navigate('/additem')} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition">
            <Plus size={18} />
            Add Your First Item
        </button>
        </div>
        ):(
        item.map((item)=>{
            const status = getStatusBadge(item.expiryDate)
            return(
            <div key={item._id} className="bg-white p-5 rounded-xl shadow">
                <h2 className='text-2xl font-bold mb-2'>{item.name}</h2>
                <span className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ${status.className}`}>
                {status.label}
                </span>
                <p>Quantity: {item.quantity}</p>
                <p>Category: {item.category}</p>
                <p>Expiry: {" "} {new Date(item.expiryDate).toLocaleDateString()}</p>
                <div className='flex gap-3 mt-4' >
                    <button onClick={()=>(navigate(`/Edititem/${item._id}`))} className='flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition'>
                        <Pencil size={14}/>
                        Edit
                    </button>
                    <button onClick={() => deleteitem(item._id) } className="flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition" >
                        <Trash2 size={14}/>
                         Delete </button>
                     </div>
                </div>
        )}
    ))}
      </div>
    </div>
  )
}
export default Pantry