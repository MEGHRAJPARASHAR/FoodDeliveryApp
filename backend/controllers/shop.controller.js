import Shop from "../models/shop.model.js";

export const createShop = async (req, res) => {
  try {
    const { name, image, city, state, address } = req.body;

    if (!name || !city || !state || !address) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    const owner = req.user?._id || req.user?.id;
    const existingShop = await Shop.findOne({ owner, name: name.trim() });
    if (existingShop) {
      return res
        .status(409)
        .json({ message: "Shop with this name already exists for this owner" });
    }

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
    const shops = await Shop.find().populate("owner", "fullName email role");
    return res.status(200).json({ message: "All shops", shops });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal error", error: error.message });
  }
};

export const getShopById = async (req, res) => {
  try {
    const { id } = req.params;
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
  try {
    const { id } = req.params;
    const { name, image, city, state, address } = req.body;

    const shop = await Shop.findOneAndUpdate(
      { _id: id, owner: req.user?._id || req.user?.id },
      { name, image, city, state, address },
      { new: true, runValidators: true },
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
  try {
    const { id } = req.params;
    const shop = await Shop.findOneAndDelete({
      _id: id,
      owner: req.user?._id || req.user?.id,
    });

    if (!shop) {
      return res.status(404).json({ message: "Shop not found or not allowed" });
    }

    return res.status(200).json({ message: "Shop deleted successfully", shop });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
