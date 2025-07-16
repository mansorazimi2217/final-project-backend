import customersModel from "../models/customersModel.js";
import mongoose from "mongoose";

const getAllCustomers = async (req, res) => {
  const userId = req.user._id;
  const customers = await customersModel
    .find({ userId })
    .sort({ createdAt: -1 });
  res.status(200).json(customers);
};

const getOneCustomer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "this customer is not exist!" });
  }

  const customer = await customersModel.findById(id);

  if (!customer) {
    return res.status(404).json({ err: "this customer is not exist!" });
  }

  res.status(200).json(customer);
};

const addNewCustomer = async (req, res) => {
  const { name, email, phone, address, lastPurchaseAt, notes, isActive } =
    req.body;
  const userId = req.user._id;

  try {
    // Check for existing email
    const existingEmail = await customersModel.findOne({
      userId,
      email,
    });

    // Check for existing phone
    const existingPhone = await customersModel.findOne({
      userId,
      phone,
    });

    if (existingEmail && existingPhone) {
      return res.status(400).json({
        error: "Both email and phone number are already in use",
        field: "both",
      });
    } else if (existingEmail) {
      return res.status(400).json({
        error: "This email is already in use",
        field: "email",
      });
    } else if (existingPhone) {
      return res.status(400).json({
        error: "This phone number is already in use",
        field: "phone",
      });
    }

    // Create the new customer
    const customer = await customersModel.create({
      userId,
      name,
      email,
      phone,
      address,
      lastPurchaseAt,
      notes,
      isActive,
    });

    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({
      error: "Server error while adding customer.",
      details: err.message,
    });
  }
};

const updateCustomer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid customer ID" });
  }

  try {
    const { actionType, totalSpent, remainValue } = req.body;
    let updateData = {};
    let options = { new: true };

    switch (actionType) {
      case "sale":
        if (
          typeof totalSpent === "undefined" ||
          typeof remainValue === "undefined"
        ) {
          return res
            .status(400)
            .json({ error: "Missing required fields for sale update" });
        }

        updateData = {
          $inc: {
            totalSpent: Number(totalSpent),
            remainValue: Number(remainValue),
            totalOrders: 1,
          },
          $set: {
            lastPurchaseAt: new Date(),
          },
        };
        break;

      // Case 2: When paying due amount (from due customers page)
      case "payDue":
        const paymentAmount = Math.abs(Number(totalSpent) || 0);
        updateData = {
          $inc: {
            totalSpent: paymentAmount,
            remainValue: -paymentAmount,
          },
          $set: {
            lastPurchaseAt: new Date(),
          },
        };
        break;

      default:
        updateData = { ...req.body };
        break;
    }

    const customer = await customersModel.findByIdAndUpdate(
      id,
      updateData,
      options
    );

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCustomer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid customer ID" });
  }

  try {
    const customer = await customersModel.findOneAndDelete({ _id: id });

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    return res.status(200).json({
      message: "Customer deleted successfully",
      customer,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default {
  getAllCustomers,
  getOneCustomer,
  addNewCustomer,
  updateCustomer,
  deleteCustomer,
};
