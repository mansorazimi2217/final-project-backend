import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const { isEmail, isStrongPassword, isMobilePhone } = validator;

const Users = new mongoose.Schema({
  firsName: {
    type: String,
    required: [true],
  },
  lastName: {
    type: String,
    required: [true],
  },
  business: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: [true],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  city: {
    type: String,
    required: [true],
  },
  province: {
    type: String,
    required: [true],
  },
  businessType: String,
  passwrod: {
    type: String,
    required: [true],
  },
  confirmPassword: {
    type: String,
    required: [true, "confirm password is required"],
  },
  profileImage: {
    type: String,
    default: "",
  },
});

Users.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.passwrod = await bcrypt.hash(this.passwrod, salt);
  this.confirmPassword = await bcrypt.hash(this.confirmPassword, salt);
  next();
});

const userModel = mongoose.model("USERHELLO", Users);

export default userModel;
