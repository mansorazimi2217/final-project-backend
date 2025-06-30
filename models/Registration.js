import mongoose from "mongoose";

const Register = new mongoose.Schema({
  firsName: String,
  lastName: String,
  business: String,
  contactNumber: String,
  email: String,
  city: String,
  province: String,
  businessType: String,
  passwrod: String,
});

const RegisterModel = mongoose.model("REGISTER", Register);

export default RegisterModel;
