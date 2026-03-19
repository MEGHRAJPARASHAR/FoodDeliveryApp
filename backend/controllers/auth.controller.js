import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import generateToken from "../utils/generateToken.js"
import { sendOTPEmail } from "../utils/sendEmail.js"
// function for SIGN UP 
export const signUp = async (req,res)=>{
    try {
        // taking name,email,password etc from req.body
        const {fullName,email,password,mobile,role}=req.body
        //finding email if it already exist 
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
        //hashing the password
        const hasedPassword = await bcrypt.hash(password,10)
        // creating the user acoount and saving it in database
        const newUser= await User.create({
            fullName,
            email,
            password:hasedPassword,
            mobile,
            role
        })
        //generating the token using user _id
        const token=generateToken(newUser._id)
        //sending the token in cookie with 15 days
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:15*24*60*60*1000
        })
        // Step 1: convert mongoose object to plain JS object
        // Step 2: pull out password (throw it away as _)
        // Step 3: put everything else into userWithoutPassword
        const { password: _, ...userWithoutPassword } = newUser.toObject()
        // Now send userWithoutPassword — no password inside! ✅
        //code 201 for creating something
        res.status(201).json({
        message: "User created successfully",
        user: userWithoutPassword
        })
    

    } catch (error) {
        console.log("error in signUp",error)
        res.status(500).json({message:"Internal server error"})
    }
}
// function for SIGN IN 
export const signIn=async (req,res)=>{
    try {
        //taking the email and password from req.body
        const {email,password}=req.body
        //finding the email if it exist
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User does not exist."})
        }
        //checking if the password is same 
        const isMatch= await bcrypt.compare(password,user.password)
         if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
         }
         //generating the password using users id
            const token=generateToken(user._id)
            //send the token to signin user
            res.cookie("token",token,{
                httpOnly:true,
                secure:false,
                sameSite:"strict",
                maxAge:15*24*60*60*1000
            })
         // Step 1: convert mongoose object to plain JS object
        // Step 2: pull out password (throw it away as _)
        // Step 3: put everything else into userWithoutPassword
        const { password: _, ...userWithoutPassword } = user.toObject()
        // Now send userWithoutPassword — no password inside! ✅
        res.status(200).json({
        message: "User signed in successfully",
        user: userWithoutPassword
        })
    } catch (error) {
        console.log("error in signIn",error)
        res.status(500).json({message:"Internal server error"})
    }
}
//creating getMe function for get request for user detail after middleware verification 
export const getMe=async (req,res)=>{
    try {
        res.status(200).json({user:req.user})
    } catch (error) {
        console.log("error in getMe",error)
        //code 500 for server error  
        res.status(500).json({message:"Internal server error"})
    }
}
export const logOut=async (req,res)=>{
    try {
    //clearing the cookie named token 
    res.clearCookie("token")
    res.status(200).json({message:"the user logged out successfully"})
    } catch (error) {
     console.log(`the error is in logout function ${error}`)   
     res.status(500).json({message:"error in logout"}) 
    }
}
export const forgotPassword=async (req,res) => {
   try {
     const {email}=req.body
    const user=await User.findOne({email})
    if(!user){
        return res.status(401).json({message:"user not found"})
    }
        const otp=Math.floor(100000 + Math.random() * 900000)
        // save OTP with 10 minute expiry
        user.otp = otp
        user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
        await user.save()
        await sendOTPEmail(email,otp)
        res.status(200).json({message:`otp is sent sucessfully to ${email} and otp is ${otp}`})
        
   } catch (error) {
        return res.status(500).json({message:"internal error",})
   }

    
}
export const verifyOTP = async (req, res) => {
    try {
        // get email and otp from body
        const { email, otp } = req.body

        // find user by email
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        // check if otp matches
        if (String(user.otp) !== String(otp)) {
            return res.status(400).json({ message: "Invalid OTP" })
        }

        // check if otp is expired
        if (user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: "OTP expired" })
        }
        user.otp=null
        user.otpExpiry=null
        await user.save()

        res.status(200).json({ message: "OTP verified successfully" })

    } catch (error) {
        console.log("error in verifyOTP", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const resetPassword=async (req,res) => {
    try {
    const {email,password}=req.body
    const user=await User.findOne({email})
    if(!user){
        return res.status(400).json({message:'user not found'})
    }
    const hashedPassword=await bcrypt.hash(password,10)
    user.password=hashedPassword
    await user.save()
    return res.status(200).json({message:"Password reset successfully"})
        
    } catch (error) {
        return res.status(500).json({message:"Internal error"})
    }
}   
