import express from "express";
import { signIn, signUp,getMe, logOut, forgotPassword, verifyOTP, resetPassword, searchUsers } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/checkRole.middleware.js";

const router=express.Router()
//routes for signUp
router.post("/signup",signUp)
//rputes for signIn
router.post("/signin",signIn)
//route for getMe for middleware testing
router.get("/me",protectRoute,checkRole("user"),getMe)
//route for the logOut
router.post("/logout",logOut)
router.post("/forgot-password",forgotPassword)
router.post("/verify-otp",verifyOTP)
router.post("/reset-password",resetPassword)
//route for searching users by name
router.get("/search",protectRoute,searchUsers)

export default router