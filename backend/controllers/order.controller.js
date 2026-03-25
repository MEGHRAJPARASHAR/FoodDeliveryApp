import Order from "../models/order.model.js"
import Cart from "../models/cart.model.js"

export const createOrder = async (req, res) => {
    try {
        const userId = req.user._id;
        const { deliveryAddress } = req.body;

        // 1. Get user's cart
        const cart = await Cart.findOne({ user: userId }).populate("items.item");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // 2. Ensure all items belong to same shop
        const shopId = cart.items[0].item.shop.toString();

        const isSameShop = cart.items.every(
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
        //find the order specific order and also confirms it should belong to that user ,not unauthorised
        const order=await Order.findOne({_id:orderId,user}).populate("shop").populate("items.item")
        //check if order is present or not
        if(!order) return res.status(404).json({message:"Order not found"})
        return res.status(200).json({message:"Order fetched successfully",order})
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
}