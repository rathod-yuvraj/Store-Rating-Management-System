const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const User = require("./User")(sequelize, DataTypes);
const Store = require("./Store")(sequelize, DataTypes);
const Rating = require("./Rating")(sequelize, DataTypes);

User.hasMany(Store, {
  foreignKey: "ownerId"
});

Store.belongsTo(User, {
  foreignKey: "ownerId"
});

User.hasMany(Rating);
Rating.belongsTo(User);

Store.hasMany(Rating);
Rating.belongsTo(Store);

module.exports = {
  sequelize,
  User,
  Store,
  Rating
};