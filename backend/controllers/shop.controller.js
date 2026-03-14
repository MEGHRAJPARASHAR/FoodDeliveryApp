
import Shop from "../models/shop.model.js"

export const createShop=async (req,res) => {
    try {
        const {name, image, city, state, address}=req.body
          if (!name || !city || !state || !address) {
            return res.status(400).json({ message: "Please fill all required fields" })
        }
        const owner=req.user.id
        const shop=await Shop.create({
            name, image, city, state, address,owner
        })
        return res.status(200).json({message:"shop created successfully",
            shop:shop
        })
    } catch (error) {
        return res.status(500).json({message:"error,creating in shop"})
    }
}






