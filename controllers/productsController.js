import productModel from "../models/productsModel.js";
import mongoose from "mongoose";

const getAllProducts = async (req, res) => {
  const userId = req.user._id;
  const products = await productModel.find({ userId }).sort({ createdAt: -1 });
  res.status(200).json(products);
};

const getSingleProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "this product is not exist!" });
  }

  const product = await productModel.findById(id);

  if (!product) {
    return res.status(404).json({ err: "this product is not exist!" });
  }

  res.status(200).json(product);
};

const addNewProduct = async (req, res) => {
  const {
    name,
    brand,
    category,
    desc,
    quantity,
    buy_price,
    selling_price,
    currency,
    expire_date,
    come_date,
  } = req.body;

  const img = req.file ? `/uploads/${req.file.filename}` : null;

  const emptFeilds = [];
  if (!name) {
    emptFeilds.push("name");
  }
  if (!brand) {
    emptFeilds.push("brand");
  }
  if (!category) {
    emptFeilds.push("category");
  }
  if (!desc) {
    emptFeilds.push("desc");
  }
  if (!quantity) {
    emptFeilds.push("quantity");
  }
  if (!buy_price) {
    emptFeilds.push("buy_price");
  }

  if (!selling_price) {
    emptFeilds.push("selling_price");
  }
  if (!currency) {
    emptFeilds.push("currency");
  }
  if (!expire_date) {
    emptFeilds.push("expire_date");
  }
  if (!come_date) {
    emptFeilds.push("come_date");
  }

  if (emptFeilds.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all feilds", emptFeilds });
  }

  try {
    const userId = req.user._id;
    const product = await productModel.create({
      userId,
      name,
      brand,
      category,
      desc,
      quantity,
      buy_price,
      selling_price,
      currency,
      expire_date,
      come_date,
      img,
    });

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ err: "this product is not exist" });
  }

  const product = await productModel.findOneAndDelete({ _id: id });

  if (!product) {
    res.status(404).json({ err: "this product is not exist!" });
  }

  res.status(200).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { soldQuantity } = req.body;

  console.log("Update controller is running for:", id, soldQuantity);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid product ID" });
  }

  try {
    const updatedData = {
      ...req.body,
    };

    if (soldQuantity) {
      const product = await productModel.findById(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const soldQty = parseInt(soldQuantity);
      if (isNaN(soldQty) || soldQty < 0) {
        return res.status(400).json({ error: "Invalid soldQuantity value" });
      }

      const newQuantity = product.quantity - soldQty;
      if (newQuantity < 0) {
        return res
          .status(400)
          .json({ error: "Sold quantity exceeds available stock" });
      }

      updatedData.quantity = newQuantity;
      updatedData.totalSold = (product.totalSold || 0) + soldQty;
    }

    if (req.file) {
      updatedData.img = "\\" + req.file.path;
    }

    const product = await productModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  addNewProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};
