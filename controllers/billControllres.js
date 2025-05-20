import billModel from "../models/sellbills.js";
import mongoose from "mongoose";

const getAllData = async (req, res) => {
  try {
    const data = await billModel.find({}).sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};

const getSingleData = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "this bill is not exist!" });
  }

  const data = await billModel.findById(id);

  if (!data) {
    res.json("bill not found!");
  }

  res.json(data);
};

const postNewData = async (req, res) => {
  try {
    const { total, totalPaied, customerName, date, products } = req.body;

    const data = await billModel.create({
      total,
      totalPaied,
      customerName,
      date,
      products,
    });

    res.status(201).json(data);
  } catch (error) {
    console.error("Failed to save bill:", error);
    res.status(500).json({ error: "Failed to save bill" });
  }
};

const updateData = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.json("bill not found!");
  }

  const data = await billModel.findByIdAndUpdate(
    id,
    { ...req.body },
    {
      new: true,
    }
  );

  res.json(data);
};

const deleteData = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid bill ID" });
  }

  try {
    const bill = await billModel.findOneAndDelete({ _id: id });

    if (!bill) {
      return res.status(404).json({ error: "Customer not found" });
    }

    return res.status(200).json({
      message: "Bill deleted successfully",
      bill,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default {
  getAllData,
  getSingleData,
  postNewData,
  updateData,
  deleteData,
};
