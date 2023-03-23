import jwt from "jsonwebtoken";
import User from "../models/User.js";

const checkAuth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password -confirmed -token -createdAt -updatedAt -__v");
      return next();
    } catch (error) {
      return res.status(401).json({ msg: "Token inválido o expirado" });
    }
  }

  return res.status(401).json({ msg: "No se proporcionó un token de autenticación" });
};

export default checkAuth;
