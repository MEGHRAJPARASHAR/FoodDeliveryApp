import Cart from "../models/cart.model.js";
import Item from "../models/item.model.js";
export const createCart=async (req,res) => {
    try {
        const userId=req.user._id //getting from middleware
        const {itemId,quantity}=req.body //getting from frontend

        // ❌ findById only accepts an _id value, not an object
        // const existingCart = await Cart.findById({ user: userId }) wrong ❌
        //  findOne accepts filter conditions ✔
        const existingCart = await Cart.findOne({ user: userId }).populate("items.item")//it exist or not
        if(!existingCart){ //if not ,then create a new one 
            const newCart=await Cart.create({
                user:userId,
                items:[{item:itemId,quantity}]
                
            })
            return res.status(201).json({message:"cart created successfully",newCart})
         }//Is the Item i am trying to add already exist in cart ❕ 
    //since my data is like this ,and i have to traverse on each to find the correct item😑
    //     items = [
    //     { _id: "abc", item: "itemId1", quantity: 2 }, // this is a obj {...}
    //     { _id: "def", item: "itemId2", quantity: 1 }]
      const existingItem=existingCart.items.find((obj)=>{
       return obj.item._id.toString()===itemId //for finding the item in the cart and return it in existingItem
      })
      if(existingItem){ //if item is in cart then just add its quantity
      existingItem.quantity+=quantity //and just save it😁
      await existingCart.save()
    return res.status(200).json({message:"item quantity increased in cart",existingCart})
                    }
    else{
       const newItem= await Item.findById(itemId)
    if(existingCart.items[0].item.shop.toString()!==newItem.shop.toString()){
        return res.status(400).json({message:"clear cart because item should be from same shop"})
    }
    existingCart.items.push({item:itemId,quantity})
    await existingCart.save()
    return res.status(200).json({message:"item added",cart:existingCart})
}
    } catch (error) {
        return res.status(500).json({message:"Internal error"})
    }
}

export const getCart =async (req,res) => {
    try {
        const userId=req.user._id
        const existingCart=await Cart.findOne({user:userId}).populate("items.item")
        if(!existingCart){
            return res.status(404).json({message:"No cart found"})
        }
        //  array.reduce((accumulator, currentValue) => {
        //  return newAccumulator
        // }, initialValue)
        const totalPrice=existingCart.items.reduce((total,obj)=>{
           return total+obj.item.price*obj.quantity        
        },0)
        return res.status(200).json({message:`The total price is ${totalPrice}`,cart:existingCart})

    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
      
    }
}
export const updateQuantity=async (req,res) => {
    try {
        const userId=req.user._id
        const {itemId,quantity}=req.body
        const existingCart=await Cart.findOne({user:userId})
        if(!existingCart){
            return res.status(404).json({message:"No cart found"})
        }
        const item=existingCart.items.find((obj)=>obj.item.toString()===itemId)
        if(!item || quantity<=0){
            return res.status(404).json({message:"No item found"})
        }
        item.quantity=quantity
        await existingCart.save()
            return res.status(200).json({message:"Item updated",item})
    } catch (error) {
            return res.status(500).json({message:"Internal server error"})
    }
}
export const deleteItem=async (req,res) => {
    try {
        const userId=req.user._id
        const {itemId}=req.params
        const existingCart=await Cart.findOneAndUpdate({user:userId},{$pull:{items:{item:itemId}}},{new:true})
        if(!existingCart) return res.status(404).json({message:"no cart found"})
        return res.status(200).json({message:"item deleted",cart:existingCart})
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
}
export const deleteCart=async (req,res) => {
    try {
        const userId=req.user._id
        const existingCart=await Cart.findOneAndUpdate({user:userId},{items:[]},{new:true})
        if(!existingCart) return res.status(404).json({message:"no cart found"})
         return res.status(200).json({message: "cart cleared", cart: existingCart})
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
}