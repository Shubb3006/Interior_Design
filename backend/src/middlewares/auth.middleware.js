import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt_token;
    if (!token)
      return res
        .status(400)
        .json({ message: "Unauthorized - No Token Available" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res.status(400).json({ message: "Unauthorized - Invalid Token" });

    const user = await Admin.findById(decoded.userId).select("-password");

    if (!user) return res.status(404).json({ message: "Admin Not found" });
    req.user = user;
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server Error" });
  }
};
