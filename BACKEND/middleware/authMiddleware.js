const jwt = require("jsonwebtoken");
const User = require("../models/user");
const secret = process.env.JWT_SECRET || "secretoProyectoIntegradorMatAngRei";

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No autorizado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secret);
    req.user = { _id: decoded.id };
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token inválido" });
  }
};
