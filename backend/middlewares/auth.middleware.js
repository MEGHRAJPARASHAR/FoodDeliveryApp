import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const protectRoute=async (req,res,next)=>{
    try {
        //taking token from cookies
        const token= req.cookies.token
        //if token is present
        if(!token){
           return res.status(401).json({message:"no token found"})
        }
        //verifying the token is valid
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        // This removes password from req.user
        const user = await User.findById(decoded.id).select('-password')
        // adding user in req 
        req.user=  user
        // next for next middleware
        next()
    } catch (error) {
        console.log(`error in server ${error}`)
        res.status(401).json({message:"error in protected routes"})
    }
}