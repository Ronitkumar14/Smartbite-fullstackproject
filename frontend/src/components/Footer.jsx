import React from 'react'
import { Copyright } from "lucide-react"
const Footer=()=>{
    return(
        <footer className="bg-green-900 text-green-200 text-center py-4 mt-auto text-sm">
            <p className="flex items-center justify-center gap-1">
                <Copyright size={16} />
                2026 SmartBite — Reduce Food Waste, Save Money
            </p>
        </footer>
    )
}
export default Footer