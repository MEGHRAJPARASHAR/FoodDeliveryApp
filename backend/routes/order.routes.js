import express from 'express';
import { createOrder, getAllOrders, getOrderById } from '../controllers/order.controller';
import { protectRoute } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', getAllOrders)
router.get('/:id', getOrderById)
router.get('/create-order',protectRoute, createOrder)


export default router;