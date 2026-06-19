import express, { urlencoded } from 'express'
import cors from 'cors'
import recipeRoutes from './src/Routes/recipeRoutes.js'
import userRoutes from './src/Routes/authRoutes.js'
import pantaryRoutes from './src/Routes/pantryRoutes.js'
const app=express()


app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}))
app.use(express.urlencoded({extended:true}))
app.use(express.json())



app.use('/api/users',userRoutes)
app.use('/api/pantry',pantaryRoutes)
app.use('/api/recipes',recipeRoutes)

export default app