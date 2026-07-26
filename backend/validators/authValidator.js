const { body } = require("express-validator");

exports.registerValidation = [

body("name")
.isLength({ min:20, max:60 })
.withMessage("Name must contain between 20 and 60 characters"),

body("email")
.isEmail()
.withMessage("Invalid Email"),

body("address")
.isLength({ max:400 }),

body("password")
.matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/)
.withMessage("Password must contain uppercase and special character")

];