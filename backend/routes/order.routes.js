import express from 'express';
import { cancelOrder, createOrder, getAllOrders, getOrderById, getShopOrders, updateOrderStatus } from '../controllers/order.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/create-order',protectRoute, createOrder)
router.get('/',protectRoute, getAllOrders)
router.get('/shop/:shopId',protectRoute, getShopOrders)
router.get('/:id',protectRoute, getOrderById)
router.put('/:orderId/status',protectRoute, updateOrderStatus)
router.put('/:orderId/cancel',protectRoute, cancelOrder)


export default router;