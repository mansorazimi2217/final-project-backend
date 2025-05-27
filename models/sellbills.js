import mongoose from "mongoose";

const SellSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USER",
      required: true,
    },
    customerId: {
      type: String,
    },
    total: {
      type: Number,
      required: true,
    },
    totalPaied: {
      type: Number,
      required: true,
    },
    remainValue: {
      type: Number,
      default: 0, // this will be overridden by pre-save middleware
    },
    customerName: {
      type: String,
      required: true,
    },

    date: {
      type: String,
    },
    profit: {
      type: Number,
      default: 0,
    },
    products: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        buyPrice: { type: Number },
        price: { type: Number, required: true },
        total: { type: Number, required: true },
        image: { type: String, default: "" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Auto-calculate remainValue before saving
SellSchema.pre("save", function (next) {
  this.remainValue = this.total - this.totalPaied;
  next();
});

SellSchema.pre("save", function (next) {
  this.remainValue = this.total - this.totalPaied;

  let totalProfit = 0;

  this.products.forEach((product) => {
    if (product.buyPrice !== undefined && product.buyPrice !== null) {
      totalProfit += (product.price - product.buyPrice) * product.quantity;
    }
  });

  this.profit = totalProfit;

  next();
});

const billModel = mongoose.model("SELLING", SellSchema);

export default billModel;
