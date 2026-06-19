import express from 'express'
import { loginuser, registeruser } from '../Controllers/authController.js'
const router=express.Router()
router.post('/register',registeruser)
router.post('/login',loginuser)
export default router