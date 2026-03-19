import Item from "../models/item.model.js";
import Shop from "../models/shop.model.js";

export const createShop = async (req, res) => {
  try {//getting these things from frontend
    const { name, image, city, state, address } = req.body;
    //if any of these are absent ,sent status 400
    if (!name || !city || !state || !address) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }
    //since we are getting user data attached to req through middleware,we can get user._id from database 
    const owner = req.user?._id || req.user?.id;//no need for user?id since data is coming from database
    const existingShop = await Shop.findOne({ owner ,//the logged in user/owner _id
       name: name.trim() //name of the shop owner is trying to create
      });
    if (existingShop) {
      //if the shop with exact name exist then ,send him status 409
      return res.status(409).json({ message: "Shop with this name already exists for another owner" });
    }
    //if different name then create the shop for him
    const shop = await Shop.create({
      name: name.trim(),
      image,
      city: city.trim(),
      state: state.trim(),
      address: address.trim(),
      owner,
    });

    return res.status(201).json({ message: "Shop created successfully", shop });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating shop", error: error.message });
  }
};

export const getAllShops = async (req, res) => {
  try {
//this code will give only owner's id=abcdefgh without populate,with populate it gives owner's name,email,role 
    const shops = await Shop.find().populate("owner", "fullName email role");
    return res.status(200).json({ message: "All shops", shops });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal error", error: error.message });
  }
};

export const getShopById = async (req, res) => {
  try {//getting shop id from frontend
    const { id } = req.params;
    //getting shop details with its id and items(string)  
    const shop = await Shop.findById(id).populate("items");

    if (!shop) {
      return res.status(404).json({ message: "No shop found" });
    }

    return res.status(200).json({ message: "Shop found", shop });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal error", error: error.message });
  }
};

export const updateShop = async (req, res) => {
  try {//getting shop id from frontend
    const { id } = req.params;
    const { name, image, city, state, address } = req.body;

    const shop = await Shop.findOneAndUpdate(
      { _id: id,//shop id for finding the shop to update
        owner: req.user?._id //logged in user/owner's id ,what if another owner try to change the data of this shop
        },
      { name, image, city, state, address },
      { new: true, runValidators: true },//runValidators if data is in correct format
    );

    if (!shop) {
      return res.status(404).json({ message: "Shop not found or not allowed" });
    }

    return res.status(200).json({ message: "Shop updated successfully", shop });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const deleteShop = async (req, res) => {
  try {//getting shop id from frontend
    const { id } = req.params;
    //we are deleting the shop only if the shop belongs to the user who is making the request
    const shop = await Shop.findOneAndDelete({
      _id: id, //shop's id which i want to delete 
      owner: req.user?._id,//logged in user/owner's id ,what if another owner try to delete this shop
    });
    if (!shop) {
      return res.status(404).json({ message: "Shop not found or not allowed" });
    }
    //since i have deleted the shop,delete its items also
    await  Item.deleteMany({ shop: id })
    


    return res.status(200).json({ message: "Shop deleted successfully", shop });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
