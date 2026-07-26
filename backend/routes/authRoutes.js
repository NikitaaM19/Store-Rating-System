const express = require("express");
const router = express.Router();

const {
    getUsers,
    addUser
} = require("../controllers/adminController");

const { verifyToken } = require("../middleware/authMiddleware");

const authController = require("../controllers/authController");

const { changePassword } = require("../controllers/authController");

router.put("/change-password", changePassword);

router.post("/login", authController.login);


router.post("/register", authController.register);


router.get("/users",  getUsers);


router.post("/users",  addUser);

module.exports = router;

