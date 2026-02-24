import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import generateToken from "../utils/generateToken.js"
export const signUp = async (req,res)=>{
    try {
        const {fullName,email,password,mobile,role}=req.body
        const user=await User.findOne({email})
        if(user){
            return res.status(400).json({message:"User already exist."})
        }
        if(password.length<6){
            return res.status(401).json({message:"the password is less than 6"})
        }
        if(mobile.length<10){
            return res.status(400).json({message:"the mobile number is less than 10 digits"})
        }
        const hasedPassword = await bcrypt.hash(password,10)
        const newUser= await User.create({
            fullName,
            email,
            password:hasedPassword,
            mobile,
            role
        })
        const token=generateToken(newUser._id)
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:15*24*60*60*1000
        })
        res.status(201).json({
            message:"User created successfully",
            user:newUser
        })
        


    } catch (error) {
        console.log("error in signUp",error)
        res.status(500).json({message:"Internal server error"})
    }
}
