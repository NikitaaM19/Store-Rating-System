const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Rating = sequelize.define("Rating", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  store_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Rating;