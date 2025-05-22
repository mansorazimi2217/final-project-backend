import mongoose from "mongoose";

const DueSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USER",
      required: true,
    },
    customerId: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    totalDue: {
      type: Number,
      required: true,
    },
    returnValue: {
      type: Number,
      required: true,
    },

    date: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const dueModel = mongoose.model("DUECUSTOMERS", DueSchema);

export default dueModel;
