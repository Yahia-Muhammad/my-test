const { body } = require("express-validator");

const validationSchema = () => {
  return [
    body("name").notEmpty().withMessage("invalid name"),
    body("email").notEmpty().withMessage("invalid email"),
    body("title").notEmpty().withMessage("title is require"),
    body("password").notEmpty().withMessage("invalid email").isLength({min: 6}).withMessage("The password must contain at least 6 characters"),
  ]
}

module.exports = {
  validationSchema
}