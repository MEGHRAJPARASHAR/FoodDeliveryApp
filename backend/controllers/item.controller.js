import Item from '../models/item.model.js';
import Shop from '../models/shop.model.js';

export const createItem = async (req, res) => {
    try {
        //taking input from req.body
        const { name, image, category, price, foodType } = req.body;
        //taking shopId from req.params
        const shopId = req.params.shopId;
        //checking if shop exists
        const shop = await Shop.findById(shopId);
        if (!shop) {
            //if shop does not exist, return 404
            return res.status(404).json({ message: 'Shop not found' });
        }
        //creating new item
        const newItem = await Item.create({
            name,
            image,
            category,
            price,
            foodType,
            shop: shopId
        });
        //pushing new item to shop's items array,if i dont do this then shop will not have reference to the item and when we get shop by id, it will not return items=[] empty array
        shop.items.push(newItem._id);
        //saving the shop after pushing new item to items array
        await shop.save();
        //pushing new item to shop's items array
        return res.status(201).json(newItem);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const getAllItems = async (req, res) => {
    try {
        const items = await Item.find().populate("shop", "name");
        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}
export const getItemById = async (req, res) => {
    try {
        const {id}=req.params
       const item=await  Item.findById(id).populate("shop","name");
       if(!item){
        return res.status(404).json({message:"item not found"})
       }
        return res.status(200).json({message:"the item found",item})
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });

    }
}
export const updateItemById = async (req, res) => {
    try {
        const {id}=req.params
        const { name, image, category, price, foodType } = req.body;
        const updateItem=await Item.findByIdAndUpdate(id,{name, image, category, price, foodType},{new:true,runValidators:true})
        if(!updateItem){
            return res.status(404).json({ message: "Item not found" });
        }
        return res.status(200).json({message:"item updated",updateItem})
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
        
    }
}

export const deleteItemById = async (req, res) => {
    try {
        const {id}=req.params
        const deletedItem=await Item.findByIdAndDelete(id)
        if(!deletedItem){
             return res.status(404).json({ message: "Item not found" });
        }
        await Shop.findByIdAndUpdate(deletedItem.shop,{$pull:{items:deletedItem._id}})
        return res.status(200).json({message:"item deleted"})

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
        
    }
}
