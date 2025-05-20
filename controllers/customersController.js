import customersModel from "../models/customersModel.js";
import mongoose from "mongoose";

const getAllCustomers = async (req, res) => {
  const customers = await customersModel.find({}).sort({ createdAt: -1 });
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

  console.log(name, email, phone, address, lastPurchaseAt, notes, isActive);

  try {
    const customer = await customersModel.create({
      name,
      email,
      phone,
      address,
      lastPurchaseAt,
      notes,
      isActive,
    });

    if (customer) {
      res.status(200).json(customer);
    }
  } catch (err) {
    res.status(404).json(err);
  }
};

const updateCustomer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid customer ID" });
  }

  try {
    let customer;

    if (req.body.totalSpent !== undefined) {
      console.log(req.body.remainVale);
      await customersModel.findByIdAndUpdate(req.params.id, {
        $inc: {
          totalSpent: Number(req.body.totalSpent),
          totalOrders: 1,
          remainValue: Number(req.body.remainVale),
        },
      });
    } else {
      customer = await customersModel.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true }
      );
    }

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

// const updateCustomer = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ error: "Invalid customer ID" });
//   }

//   try {

//     const customer = await customersModel.findByIdAndUpdate(
//       id,
//       { ...req.body },
//       {
//         new: true,
//       }
//     );

//     if (!customer) {
//       res.status(404).json("customer not found");
//     }

//     res.status(200).json(customer);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
