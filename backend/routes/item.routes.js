import express from "express"
import { createItem, deleteItemById, getAllItems, getItemById, updateItemById } from "../controllers/item.controller.js"
import { protectRoute } from "../middlewares/auth.middleware.js"
import { checkRole } from "../middlewares/checkRole.middleware.js"

const itemRouter= express.Router()

itemRouter.get('/',getAllItems)
itemRouter.post('/:shopId/create-item',protectRoute,checkRole("owner"),createItem)
itemRouter.get('/:id',protectRoute,getItemById)//by id of item not of shops id
itemRouter.put('/:id',protectRoute,checkRole("owner"),updateItemById)
itemRouter.delete('/:id',protectRoute,checkRole("owner"),deleteItemById)

export default itemRouter