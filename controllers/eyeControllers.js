const Eye = require("../models/eye");
const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middleware/asyncWrapper");
const appError = require("../utils/appError");
const { validationResult } = require("express-validator");

const getAllDoctors = async (req, res) => {
  const allDoctors = await Eye.find({});
  res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { allDoctors } });
};

const getDoctor = asyncWrapper(async (req, res, next) => {
  const doctor = await Eye.findById(req.params.doctorId);

  if (!doctor) {
    const error = appError.create(404, httpStatusText.FAIL, "doctor not found");
    return next(error);
  }

  res.status(200).json({ status: httpStatusText.SUCCESS, data: { doctor } });
});

const addDoctor = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const error = appError.create(404, httpStatusText.FAIL, errors.array());
    return next(error);
  }
  const newDoctor = new Eye(req.body);
  await newDoctor.save();
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { newDoctor } });
});

const updataData = async (req, res) => {
  const edit = await Eye.updateOne(
    { _id: req.params.doctorId },
    { $set: { ...req.body } }
  );
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { edit } });
};

const deleteDoctor = async (req, res) => {
  const deleteDoc = await Eye.deleteOne({ _id: req.params.doctorId });
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { deleteDoc } });
};

module.exports = {
  getAllDoctors,
  getDoctor,
  addDoctor,
  updataData,
  deleteDoctor,
};
