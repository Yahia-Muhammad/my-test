const mongoose = require("mongoose");

const eyeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model("Eye", eyeSchema);