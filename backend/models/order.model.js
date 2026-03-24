import mongoose, { mongo } from "mongoose"

const orderItemSchema= new mongoose.Schema({
    item:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Item",
        required:true
    },
    quantity:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true
    }
})

const orderSchema=new mongoose.Schema({
    user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true   
    },
    shop:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Shop",
        required:true
    },
    items:[orderItemSchema],
    totalPrice:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum: ["pending", "confirmed", "preparing", "out_for_delivery", "delivered", "cancelled"],
        default: "pending"
    },
    isPaid: { type: Boolean, default: false },
    deliveryAddress: { type: String, required: true }
},{timestamps:true})

const Order= mongoose.model("Order", orderSchema)
export default Order