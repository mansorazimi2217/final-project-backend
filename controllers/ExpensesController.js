import Expenses from "../models/Expenses.js";

const getAll = async (req, res) => {
  const userId = req.user._id;
  const expense = await Expenses.find({ userId });
  if (expense) {
    res.status(200).json(expense);
  }
};

const addNew = async (req, res) => {
  const data = req.body;

  const userId = req.user._id;
  try {
    const expense = await Expenses.create({
      userId: userId,
      date: data.date,
      category: data.category,
      amount: data.amount,
      paymentMethod: data.paymentMethod,
      notes: data.notes,
    });

    if (expense) {
      res.status(200).json(expense);
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const updated = await Expenses.findOneAndUpdate(
      { _id: id, userId },
      {
        $set: {
          date: req.body.date,
          category: req.body.category,
          amount: req.body.amount,
          paymentMethod: req.body.paymentMethod,
          notes: req.body.notes,
        },
      },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ error: "Expense not found or not authorized" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update expense" });
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const deleted = await Expenses.findOneAndDelete({ _id: id, userId });

    if (!deleted) {
      return res
        .status(404)
        .json({ error: "Expense not found or not authorized" });
    }

    res.status(200).json({ message: "Expense deleted successfully", deleted });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete expense" });
  }
};

export default {
  addNew,
  getAll,
  updateExpense,
  deleteExpense,
};
