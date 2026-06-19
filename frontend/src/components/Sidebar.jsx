import React, { useState } from 'react'
import {Link,useNavigate,useLocation } from 'react-router-dom'
const Sidebar=()=>{
    const navigate=useNavigate()
    const location=useLocation()
    const [isOpen,setIsOpen]=useState(false)
    const handleLogout=()=>{
        localStorage.removeItem("token")
        navigate("/login")
    }
    const navlinks=[
        { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
        { path: '/pantry', label: 'Pantry', icon: '🗄️' },
        { path: '/additem', label: 'Add Item', icon: '➕' },
        { path: '/recipes', label: 'Recipes', icon: '🍴' },
    ]
    return (
        <>
            {/* sidebar has been hidden when screen is large---> lg-hidden */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-green-900 text-white flex items-center justify-between px-4 z-30">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">🥗</span>
                    <h1 className="text-lg font-bold">SmartBite</h1>
                </div>
                <button onClick={() =>setIsOpen(!isOpen)} className="text-2xl">
                    {isOpen?'✕':'☰'}
                </button>
            </div>

            {isOpen &&(
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-20"
                    onClick={()=>setIsOpen(false)}
                />
            )}
            <div className={`fixed top-0 left-0 h-screen w-64 bg-green-900 text-white flex flex-col justify-between py-6 px-4 z-30 transition-transform duration-300
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                <div>
                    <div className="flex items-center gap-3 mb-10 px-2">
                        <span className="text-3xl">🥗</span>
                        <div>
                            <h1 className="text-xl font-bold">SmartBite</h1>
                            <p className="text-xs text-green-300">Eat Smart, Waste Less</p>
                        </div>
                    </div>
                    <nav className="flex flex-col gap-2">
                        {navlinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
                                    ${location.pathname === link.path
                                        ? 'bg-green-600 text-white font-semibold'
                                        : 'hover:bg-green-700 text-green-100'
                                    }`}
                            >
                                <span>{link.icon}</span>
                                <span>{link.label}</span>
                            </Link>
                        ))}
                    </nav>
                </div>

                <div>
                    <div className="bg-green-700 rounded-xl p-4 mb-6 text-center">
                        <div className="text-4xl mb-2">🥦</div>
                        <p className="font-semibold text-sm">Reduce Waste, Save Money</p>
                        <p className="text-xs text-green-200 mt-1">
                            Manage your pantry and get recipe suggestions based on what you have!
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full bg-white text-green-800 font-semibold py-2 rounded-lg hover:bg-green-100"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    )
}
export default Sidebar