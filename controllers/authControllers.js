import User from "../models/Users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const maxAge = 2 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: maxAge });
};

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (user) {
    const auth = await bcrypt.compare(password, user.passwrod);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email!");
};

const login_post = async (req, res) => {
  const { email, passwrod } = req.body;
  console.log(email, passwrod);
  try {
    const user = await login(email, passwrod);
    const token = createToken(user._id);
    const normalizedProfileImage = user.profileImage.replace(/\\/g, "/");
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    console.log(token);
    res.status(200).json({
      email: user.email,
      token,
      profileImage: normalizedProfileImage,
      businessName: user.business,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const signup_post = async (req, res) => {
  const data = req.body;
  console.log(data);

  try {
    console.log("hello this is data you need : " + data.email);
    if (
      !data.fname ||
      !data.lname ||
      !data.bname ||
      !data.phone ||
      !data.email ||
      !data.city ||
      !data.province ||
      !data.passwrod ||
      !data.confirm
    ) {
      throw Error("Make sure all inputs are filled!");
    }

    if (!validator.isEmail(data.email)) {
      throw Error("email is not valid!");
    }

    if (!validator.isStrongPassword(data.passwrod)) {
      throw Error("password is not strong enough");
    }

    if (data.passwrod !== data.confirm) {
      throw Error("password and confirm password most be same");
    }

    const email = data.email;

    const exist = await User.findOne({ email });

    if (exist) {
      throw Error("this email is all ready exist!");
    }

    const profileImagePath = "uploads/profile.png";

    const user = await User.create({
      firsName: data.fname,
      lastName: data.lname,
      business: data.phone,
      contactNumber: data.bname,
      email: data.email,
      city: data.city,
      province: data.province,
      passwrod: data.passwrod,
      confirmPassword: data.confirm,
      profileImage: profileImagePath,
    });

    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    console.log(token);
    res.status(201).json({
      email: user.email,
      token,
      profileImage: profileImagePath,
      businessName: user.business,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const update_profile_image = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    const normalizedPath = req.file.path.replace(/\\/g, "/");

    user.profileImage = normalizedPath;
    await user.save();

    res.status(200).json({
      message: "Profile image updated successfully",
      profileImage: normalizedPath,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default { login_post, signup_post, update_profile_image };
