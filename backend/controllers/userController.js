const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const { User, Store, Rating } = require("../models");


exports.getAllStores = async (req, res) => {
    try {
        const stores = await Store.findAll({
            include: [{ model: Rating, attributes: ["rating"] }]
        });

        const formatted = stores.map(store => {
            const ratings = store.Ratings || [];

            let avg = null;

            if (ratings.length > 0) {
                const total = ratings.reduce((sum, r) => sum + r.rating, 0);
                avg = (total / ratings.length).toFixed(1);
            }

            return {
                ...store.toJSON(),
                averageRating: avg
            };
        });

        res.json(formatted);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.rateStore = async (req, res) => {
    try {
        const { storeId, rating } = req.body;

        let existing = await Rating.findOne({
            where: {
                user_id: req.user.id,
                store_id: storeId
            }
        });

        if (existing) {
            existing.rating = rating;
            await existing.save();
            return res.json({ message: "Rating updated" });
        }

        await Rating.create({
            user_id: req.user.id,
            store_id: storeId,
            rating
        });

        res.json({ message: "Rating added" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findByPk(req.user.id);

    const match = await bcrypt.compare(oldPassword, user.password);

    if (!match) {
        return res.status(400).json({ message: "Wrong password" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await user.update({ password: hashed });

    res.json({ message: "Password changed" });
};