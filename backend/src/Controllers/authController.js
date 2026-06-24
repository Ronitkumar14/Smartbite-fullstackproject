import { Users } from "../Models/Users.models.js";
import bcrypt from 'bcryptjs'
import  jwt  from "jsonwebtoken";
export const registeruser=async(req,res)=>{
    try{
        const {firstname,lastname,email,password}=req.body
            if(!firstname || !lastname || !email || !password){
                return res.status(400).json({
                message:"All fields are required"
            })
        }
        const emailfound=await Users.findOne({email})
        if(emailfound){
            return res.status(400).json({
                message:"user with this email is already existed",
                Credential:true
            })
        }
        const hashedpassword=await bcrypt.hash(password,10)
        const user=await Users.create({
            firstname,lastname,email,
            password:hashedpassword
        })
        const register_token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
        return res.status(200).json({
            token:register_token,
            user:{
                id:user._id,
                firstname,lastname,email
            }

        })
    }catch (error) {
       console.log(error) 
       return res.status(500).json({ message: "server error" })
    }
}
export const loginuser=async(req,res)=>{
    try{
        const{email,password}=req.body
        if(!email || !password){
            return res.status(400).json({
                message:"all inputs fields are required"
            })
        }
        const userfound=await Users.findOne({email})
        if(!userfound){
            return res.status(404).json({
                message:"user tu login he nhi!(user not found)"
            })
        }
        const ispasswordcorrect=await bcrypt.compare(password,userfound.password)
        if(!ispasswordcorrect){
            return res.status(400).json({
                message:"password is not matched!"
            })
        }
        const logintoken=jwt.sign({id:userfound._id},process.env.JWT_SECRET,{expiresIn:'7d'})
        return res.status(200).json({
            token:logintoken,
            user:{
                id:userfound._id,
                firstname:userfound.firstname,
                lastname:userfound.lastname,
                email
            }
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({ message: "server error" })
    }
}