import express from "express";
import { createCart, deleteCart, deleteItem, getCart, updateQuantity } from "../controllers/cart.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router=express.Router()

router.get('/',protectRoute,getCart)
router.post('/create-cart',protectRoute,createCart)
router.put('/update-cart',protectRoute,updateQuantity)
router.delete('/delete-item/:itemId',protectRoute,deleteItem)
router.delete('/delete-cart',protectRoute,deleteCart)

export default router

