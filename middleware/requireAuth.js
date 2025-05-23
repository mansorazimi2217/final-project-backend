import jwt from "jsonwebtoken";
import User from "../models/Users.js";
const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.SECRET);
    console.log(id);
    req.user = await User.findById(id).select("_id");

    next();
  } catch (err) {
    return res.status(401).json({ error: "Request is not authorized" });
  }
};

export default requireAuth;
