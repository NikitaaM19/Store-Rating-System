const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const { User } = require("../models");

const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.status(400).json(errors.array());

        }

        const { name, email, password, address } = req.body;

        const existing = await User.findOne({
            where: { email }
        });

        if (existing) {

            return res.status(400).json({
                message: "Email already exists"
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({

            name,
            email,
            password: hashedPassword,
            address,
            role: "USER"

        });

        res.status(201).json({

            message: "Registration Successful",
            token: generateToken(user)

        });

    } catch (error) {

        res.status(500).json(error);

    }

};
exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({
                message: "Invalid Credentials"
            });
        }

        res.json({
            message: "Login Successful",
            token: generateToken(user),
            id: user.id,
            name: user.name,
            role: user.role
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
exports.changePassword = async (req, res) => {
    try {
        const { id, password } = req.body;

        const hashed = await bcrypt.hash(password, 10);

        await User.update(
            { password: hashed },
            { where: { id } }
        );

        res.json({
            message: "Password Updated Successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};