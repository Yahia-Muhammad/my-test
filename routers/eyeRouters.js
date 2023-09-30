const express = require("express");

const router = express.Router();

const eyeControllers = require("../controllers/eyeControllers");

const { validationSchema } = require("../middleware/valiDoctorMiddle");

const verifyToken = require("../middleware/verifyToken");

// Get All Doctors
router.get("/", eyeControllers.getAllDoctors);
// Add Doctor To DataBase
router.post("/", verifyToken, validationSchema(), eyeControllers.addDoctor);
// Get Doctor
router.get("/:doctorId", eyeControllers.getDoctor);
// Edit Details Doctor
router.patch("/:doctorId", verifyToken, eyeControllers.updataData);
// Delete Doctor
router.delete("/:doctorId", verifyToken, eyeControllers.deleteDoctor);

module.exports = router;
