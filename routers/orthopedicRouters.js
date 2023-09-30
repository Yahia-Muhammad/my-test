const express = require("express");

const router = express.Router();

const orthopedicControllers = require("../controllers/orthopedicControllers");

const { validationSchema } = require("../middleware/valiDoctorMiddle");

const verifyToken = require("../middleware/verifyToken");

// Get All Doctors
router.get("/", orthopedicControllers.getAllDoctors);
// Add Doctor To DataBase
router.post("/", verifyToken, validationSchema(), orthopedicControllers.addDoctor);
// Get Doctor
router.get("/:doctorId", orthopedicControllers.getDoctor);
// Edit Details Doctor
router.patch("/:doctorId", verifyToken, orthopedicControllers.updataData);
// Delete Doctor
router.delete("/:doctorId", verifyToken, orthopedicControllers.deleteDoctor);

module.exports = router;
