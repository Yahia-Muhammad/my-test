const express = require("express");

const router = express.Router();

const adminControllers = require("../controllers/adminControllers");

const { validationSchema } = require("../middleware/valiAdminMiddle");

const verifyToken = require("../middleware/verifyToken");

router.get("/", adminControllers.getAllAdmin);
// router.get("/", adminControllers.getAllAdmin);

router.post("/register", verifyToken, validationSchema(), adminControllers.register);

router.post("/login", adminControllers.login);

module.exports = router;
