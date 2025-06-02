import mongoose, { mongo } from "mongoose";

const ExpensesSchema = mongoose.Schema({
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
  maymentMethod: {
    type: String,
    default: "Cash",
  },
  notes: {
    type: String,
  },
});

const expensesModel = mongoose.model("EXPENSES", ExpensesSchema);

export default expensesModel;
