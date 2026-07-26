const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const { User, Store, Rating } = require("../models");

exports.getUsers = async (req, res) => {
    try {
        const search = req.query.search || "";
        const sortBy = req.query.sortBy || "name";
        const sortOrder = req.query.sortOrder || "ASC";

        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await User.findAndCountAll({
            attributes: { exclude: ["password"] },

            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } },
                    { email: { [Op.like]: `%${search}%` } },
                    { address: { [Op.like]: `%${search}%` } },
                    { role: { [Op.like]: `%${search}%` } }
                ]
            },

            order: [[sortBy, sortOrder]],
            limit,
            offset
        });

        res.json({
            users: rows,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addUser = async (req, res) => {
    try {
        const { name, email, password, address, role } = req.body;

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashed,
            address,
            role
        });

        res.status(201).json(user);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.update(req.body);

        res.json({ message: "User updated", user });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.destroy();

        res.json({ message: "User deleted successfully" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getStores = async (req, res) => {
    try {
        const search = req.query.search || "";
        const sortBy = req.query.sortBy || "name";
        const sortOrder = req.query.sortOrder || "ASC";

        const stores = await Store.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } },
                    { email: { [Op.like]: `%${search}%` } },
                    { address: { [Op.like]: `%${search}%` } }
                ]
            },
            order: [[sortBy, sortOrder]]
        });

        res.json(stores);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.addStore = async (req, res) => {
    try {
        const { name, email, address, ownerId } = req.body;

        const exists = await Store.findOne({ where: { email } });

        if (exists) {
            return res.status(400).json({
                message: "Store email already exists"
            });
        }

        const store = await Store.create({
            name,
            email,
            address,
            owner_id: ownerId
        });

        res.status(201).json(store);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.deleteStore = async (req, res) => {
    try {
        const id = req.params.id;

        await Store.destroy({
            where: { id }
        });

        res.json({ message: "Store deleted successfully" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.updateStore = async (req, res) => {
    try {
        const id = req.params.id;

        const { name, email, address, ownerId } = req.body;

        await Store.update(
            {
                name,
                email,
                address,
                owner_id: ownerId
            },
            {
                where: { id }
            }
        );

        res.json({ message: "Store updated successfully" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getStoreOwners = async (req, res) => {
    try {
        const owners = await User.findAll({
            where: {
                role: "OWNER"
            },
            attributes: ["id", "name", "email"],
            order: [["name", "ASC"]]
        });

        res.json(owners);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

exports.dashboard = async (req, res) => {
    try {

        const totalUsers = await User.count();

        const totalStores = await Store.count();

        const totalRatings = await Rating.count();

        res.json({
            totalUsers,
            totalStores,
            totalRatings
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};