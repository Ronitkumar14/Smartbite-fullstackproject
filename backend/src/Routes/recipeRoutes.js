import express from 'express'
const router=express.Router()
import { getingrediants, getrecipeDetails } from '../Controllers/recipeController.js'
import protect from '../Middlewares/authmiddleware.js'

router.post('/suggestions',protect,getingrediants)
router.get('/:id',protect,getrecipeDetails)
export default router