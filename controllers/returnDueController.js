import returnDueModel from "../models/returnDueModel.js";

const getAll = async (req, res) => {
  const userId = req.user._id;
  const result = await returnDueModel.find({ userId }).sort({ createdAt: -1 });

  res.status(200).json(result);
};

const postNew = async (req, res) => {
  const data = req.body;
  const userId = req.user._id;

  try {
    const result = await returnDueModel.create({
      userId: userId,
      customerId: data.customerId,
      customerName: data.customerName,
      totalDue: data.totalDue,
      returnValue: data.returnValue,
      date: new Date(),
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  console.log(id + "hello how are oyou");
  const result = await returnDueModel.findByIdAndDelete({ _id: id });
  if (!result) {
    res.status(400).json({ err: "can't delete this record" });
  }

  res.status(200).json(result);
};

export default {
  postNew,
  getAll,
  deleteOne,
};
