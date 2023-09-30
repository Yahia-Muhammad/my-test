const { body } = require("express-validator");

const validationSchema = () => {
  return [
    body("name").notEmpty().withMessage("invalid name"),
    body("email").notEmpty().withMessage("invalid email"),
    body("specialization").notEmpty().withMessage("specialization is require")
  ]
}

module.exports = {
  validationSchema
}