const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");
const generateJwt = require("../utils/generateJwt");
const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middleware/asyncWrapper");
const { validationResult } = require("express-validator");
const appError = require("../utils/appError");

const getAllAdmin = async (req, res) => {
  const allAdmin = await Admin.find({});
  res.send(allAdmin);
};

const register = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const error = appError.create(404, httpStatusText.FAIL, errors.array());
    return next(error);
  }
  const { name, email, title, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);

  const newAdmin = new Admin({
    name,
    email,
    title,
    password: hashPassword,
  });

  await newAdmin.save();

  res.send(newAdmin);
});

const login = asyncWrapper(async (req, res, next) => {
  const {email, password} = req.body;
  if(!email && !password){
    const error = appError.create(500, httpStatusText.ERROR, "check email and password");
    return next(error);
  }
  const getAdmin = await Admin.findOne({email: email});
  if(!getAdmin){
    const error = appError.create(500, httpStatusText.ERROR, "invalid email");
    return next(error);
  }
  const matchedPassword = await bcrypt.compare(password, getAdmin.password);
  if(!matchedPassword){
    const error = appError.create(500, httpStatusText.ERROR, "invalid password");
    return next(error);
  }



  if(getAdmin, matchedPassword){
    console.log("Get User Successful");
    const token = await generateJwt({
      id: getAdmin._id,
      email: getAdmin.email
    })
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { token } });
  }else{
    console.log("Reject");
    res.send("Somthing Wrong");
  }
});

module.exports = {
  getAllAdmin,
  register,
  login
};
