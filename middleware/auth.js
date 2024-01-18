const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Bạn không có quyền truy cập",
    });
  }

  jwt.verify(token, process.env.TOKEN_SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Bạn không có quyền truy cập",
      });
    }
    const user = await userModel.findById(decoded._id);
    if (user) {
      req.user = user;
      next();
    }
  });
};

const isAdmin = async (req, res, next) => {
  if (req.user) {
    const user = await userModel.findById(req.user._id);
    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Bạn không có quyền",
      });
    }
  }
  next();
};

module.exports = {
  authenticateToken,
  isAdmin,
};
