import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USER",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
    },

    category: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
    },

    buy_price: {
      type: String,
      required: true,
    },
    selling_price: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    expire_date: {
      type: String,
    },

    come_date: {
      type: String,
    },
    img: {
      type: String,
    },
    totalSold: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("PRODUCT", productSchema);

export default productModel;
