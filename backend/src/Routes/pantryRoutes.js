import express from "express"
const router=express.Router()
import protect from "../Middlewares/authmiddleware.js"
import { getpantry,postpantry,updatepantry,deletepantry, getsinglepantry } from "../Controllers/pantaryController.js"

router.get('/',protect,getpantry)
router.post('/add',protect,postpantry)
// data edit krne se phle data ko fetch krwana bhi tu zurrori he!
router.get('/:id',protect,getsinglepantry)
router.put('/update/:id',protect,updatepantry)
router.delete('/delete/:id',protect,deletepantry)
export default router