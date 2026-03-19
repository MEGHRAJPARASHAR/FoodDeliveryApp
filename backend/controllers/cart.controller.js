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

```
1. Get userId from req.user._id (logged in user)
2. Get itemId and quantity from req.body
3. Find if this user already has a cart in database
4. If NO cart exists → create a new cart with this item
5. If cart EXISTS → check if this item is already in the cart
      - If item already in cart → just increase its quantity
      - If item not in cart → push it as new entry
6. Save and return the cart
```
