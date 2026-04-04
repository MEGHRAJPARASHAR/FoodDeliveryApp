import express from "express"
import { createShop, deleteShop, getAllShops, getShopById, updateShop } from "../controllers/shop.controller.js"
import { protectRoute } from "../middlewares/auth.middleware.js"
import { checkRole } from "../middlewares/checkRole.middleware.js"

const router=express.Router()

router.post("/create-shop",protectRoute,checkRole("owner"),createShop)
router.get("/",getAllShops)
router.get("/:id",protectRoute,checkRole("owner"),getShopById)
router.put("/:id",protectRoute,checkRole("owner"),updateShop)
router.delete("/:id",protectRoute,checkRole("owner"),deleteShop)

export default router