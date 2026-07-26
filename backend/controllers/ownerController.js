const { Store, Rating, User } = require("../models");

exports.getDashboard = async (req, res) => {

    try {

        const ownerId = req.params.ownerId;

        const store = await Store.findOne({

            where: {
                owner_id: ownerId
            },

            include: [

                {
                    model: Rating,

                    required: false,

                    include: [

                        {
                            model: User,
                            attributes: [
                                "id",
                                "name",
                                "email"
                            ]
                        }

                    ]
                }

            ]

        });

        if (!store) {

            return res.status(404).json({

                storeName: "No Store Found",

                averageRating: "0.0",

                users: []

            });

        }

        const ratings = store.Ratings || [];

        let averageRating = "0.0";

        if (ratings.length > 0) {

            const total = ratings.reduce(
                (sum, r) => sum + Number(r.rating),
                0
            );

            averageRating = (
                total / ratings.length
            ).toFixed(1);

        }

        const users = ratings.map(r => ({

            id: r.User?.id,

            name: r.User?.name,

            email: r.User?.email,

            rating: r.rating

        }));

        res.json({

            storeName: store.name,

            averageRating,

            users

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: err.message

        });

    }

};