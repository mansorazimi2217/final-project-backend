import mongoose from "mongoose";

const SellSchema = mongoose.Schema(
  {
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
    products: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
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

const billModel = mongoose.model("SELLING", SellSchema);

export default billModel;
