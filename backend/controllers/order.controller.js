import mongoose from "mongoose";
import Order from "../models/order.model.js"
import Cart from "../models/cart.model.js"
import Shop from "../models/shop.model.js"

export const createOrder = async (req, res) => {
    try {
        const userId = req.user._id;//getting user id from middleware
        const { deliveryAddress } = req.body;//from frontend

        // 1. Get user's cart by userId
        const cart = await Cart.findOne({ user: userId }).populate("items.item");
        //now checking if cart is empty or not made
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // 2. Ensure all items belong to same shop
        const shopId = cart.items[0].item.shop.toString();

        const isSameShop = cart.items.every(
            //every item has same shop as first item's
            ci => ci.item.shop.toString() === shopId
        );
        
        if (!isSameShop) {
            return res.status(400).json({
                message: "Items must be from same shop"
            });
        }

        // 3. Prepare order items & calculate total
        let totalPrice = 0;

        const orderItems = cart.items.map(ci => {
            const price = ci.item.price;

            totalPrice += price * ci.quantity;

            return {
                item: ci.item._id,
                quantity: ci.quantity,
                price: price // snapshot
            };
        });

        // 4. Create order
        const order = await Order.create({
            user: userId,
            shop: shopId,
            items: orderItems,
            totalPrice,
            deliveryAddress
        });

        // 5. Clear cart AFTER order success
        cart.items = [];
        await cart.save();

        // 6. Send response
        return res.status(201).json({
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

export const getAllOrders=async (req,res) => {
    try {
        //userId from middleware
        const userId=req.user._id
        //find the order which havae this userId then populate the shop first then items
        const orders=await Order.find({user:userId}).populate("shop").populate("items.item").sort({createdAt:-1}) //latest order first then old order ones
        return res.status(200).json({message:"Orders fetched successfully",orders})
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
}

export const getOrderById=async (req,res) => {
    try {
        //user id from middleware
        const user=req.user._id
        //orderId from params 
        const orderId=req.params.id
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ message: "Invalid order ID" });
        }
        //find the order specific order and also confirms it should belong to that user ,not unauthorised
        const order=await Order.findOne({_id:orderId,user}).populate("shop").populate("items.item")
        //check if order is present or not
        if(!order) return res.status(404).json({message:"Order not found"})
        return res.status(200).json({message:"Order fetched successfully",order})
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
}

export const updateOrderStatus=async (req,res) => {
    try {
// Get orderId from req.params and status from req.body
// Find the order by ID
// If not found → 404
// Check if the logged in user actually owns the shop on that order — compare req.user._id with the shop's owner. You'll need to fetch the shop for this
// If not the owner → 403
// Update the status and save
// Return the updated order

        const {orderId}=req.params
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ message: "Invalid order ID" });
        }
        const {status}=req.body
        const existingOrder=await Order.findById(orderId)
        if(!existingOrder) return res.status(404).json({message:"Order not found"})
        // const sameOwner=((await Shop.findById(existingOrder.shop)).owner).toString()===req.user._id.toString()
        // if(!sameOwner) return res.status(403).json({message:"no authorised"})
        const existingShop=await Shop.findById(existingOrder.shop)
        if(!existingShop) return res.status(404).json({message:"shop not found"})
        const sameOwner=existingShop.owner.toString()===req.user._id.toString()
        if(!sameOwner) return res.status(403).json({message:"no authorised"})
        existingOrder.status=status
        await existingOrder.save()
        return res.status(200).json({message:"status updated",existingOrder})
    } catch (error) {
        return res.status(500).json({message:"Internal server error",error:error.message})
    }
}

export const cancelOrder=async (req,res) => {
    try {
// Get orderId from req.params
// Find the order by ID and check it belongs to the logged in user
// If not found → 404
// Check if the status is "pending" or "confirmed" — only these can be cancelled. If it's already "preparing" or beyond → return an error saying it's too late to cancel
// Set status to "cancelled" and save
// Return the updated order
    const {orderId}=req.params
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({ message: "Invalid order ID" });
    }
    const userId=req.user._id
    const existingOrder=await Order.findOne({_id:orderId,user:userId})
    if(!existingOrder) return res.status(404).json({message:"order not found"})
    if(existingOrder.status!=="pending" && existingOrder.status!=="confirmed"){
        return res.status(400).json({message:"too late brother😂,now it cannot be cancelled"})
    }
    existingOrder.status="cancelled"
    await existingOrder.save()
    return res.status(200).json({message:"the order has been cancelled"})

    } catch (error) {
    return res.status(500).json({message:"Internal server error",error:error.message})
    }
}

export const getShopOrders=async (req,res) => {
    try {
// Get shopId from req.params
// Verify the logged in user actually owns that shop — fetch the shop and compare shop.owner with req.user._id. If not the owner → 403
// Find all orders where shop === shopId and populate user (to see who placed the order) and items.item (to see what was ordered)
// Sort by latest first
// Return the orders
        const {shopId}=req.params
        if (!mongoose.Types.ObjectId.isValid(shopId)) {
            return res.status(400).json({ message: "Invalid order ID" });
        }
       
       const existingShop=await Shop.findOne({_id:shopId})
       if(!existingShop) return res.status(404).json({message:"shop not found😥"})
        const sameOwner=existingShop.owner.toString()===req.user._id.toString()
       if(!sameOwner) return res.status(403).json({message:"sorry bro😥,you are not authorised"})
        const allOrders=await Order.find({shop:shopId}).populate("user").populate("items.item").sort({createdAt:-1})
    return res.status(200).json({message:"here are all order",order:allOrders})
    } catch (error) {
    return res.status(500).json({message:"Internal server error",error:error.message})
        
    }
}