import Cart from "../models/cart.model.js";
export const createCart=async (req,res) => {
    try {
        const userId=req.user._id
        const {itemId,quantity}=req.body
        // ❌ findById only accepts an _id value, not an object
        // const existingCart = await Cart.findById({ user: userId })

        //  findOne accepts filter conditions
        const existingCart = await Cart.findOne({ user: userId })
        if(!existingCart){
            const newCart=await Cart.create({
                user:userId,
                items:[{item:itemId,quantity}]
                
            })
            return res.status(201).json({message:"cart created successfully",newCart})
         }//since my data is like this ,and i have to traverse on each to find the correct item
    //     items = [
    //     { _id: "abc", item: "itemId1", quantity: 2 }, // this is a obj
    //     { _id: "def", item: "itemId2", quantity: 1 }]
    // 

      const existingItem=existingCart.items.find((obj)=>{
       return obj.item.toString()===itemId
      })
      if(existingItem){  
      existingItem.quantity+=quantity
      await existingCart.save()
    return res.status(200).json({message:"item quantity increased in cart",existingCart})

}else{
    existingCart.items.push({item:itemId,quantity})
    await existingCart.save()
    return res.status(200).json({message:"item added in cart",existingCart})
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
            return res.status(400).json({message:"No cart found"})
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
        if(!item){
            return res.status(404).json({message:"No item found"})
        }
        item.quantity=quantity
        await existingCart.save()
            return res.status(200).json({message:"Item updated",item})
    } catch (error) {
            return res.status(500).json({message:"Internal server error"})
    }
}
// 1. Get userId from req.user._id
// 2. Get itemId and quantity from req.body
// 3. Find cart of this user
// 4. If no cart → return 404
// 5. Find the specific item inside cart.items array
// 6. If item not found → return 404
// 7. Update its quantity
// 8. Save and return cart
