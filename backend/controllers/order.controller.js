import Order from "../models/order.model.js"

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
        //find the order specific order and also confirms it should belong to that user ,not unauthorised
        const order=await Order.findOne({_id:orderId,user}).populate("shop").populate("items.item")
        //check if order is present or not
        if(!order) return res.status(404).json({message:"Order not found"})
        return res.status(200).json({message:"Order fetched successfully",order})
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
}