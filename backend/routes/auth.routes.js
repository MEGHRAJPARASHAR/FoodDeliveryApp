import express from "express";
import { signIn, signUp,getMe } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router=express.Router()
//routes for signUp
router.post("/signup",signUp)
//rputes for signIn
router.post("/signin",signIn)
//route for getMe for middleware testing
router.get("/me",protectRoute,getMe)
export default router