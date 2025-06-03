import mongoose, { mongo } from "mongoose";

const ExpensesSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    default: "Cash",
  },
  notes: {
    type: String,
  },
});

const expensesModel = mongoose.model("EXPENSES", ExpensesSchema);

export default expensesModel;
