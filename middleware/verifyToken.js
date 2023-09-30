const jwt = require('jsonwebtoken');
const httpStatusText = require("../utils/httpStatusText");
const appError = require("../utils/appError");


const verifyToken = (req, res, next) => {
  const authHeader = req.headers["Authorization"] || req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  try{
    const currentAdmin = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.currentAdmin = currentAdmin;
    next();
  }catch(err){
    const error = appError.create(401, httpStatusText.ERROR, "invalid token");
    return next(error);
  }
}

module.exports = verifyToken;