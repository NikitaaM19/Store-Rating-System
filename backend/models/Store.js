const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Store = sequelize.define("Store", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  address: {
    type: DataTypes.STRING(400),
    allowNull: false
  },
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Store;