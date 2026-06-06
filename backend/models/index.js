const User = require("./User");
const Store = require("./Store");
const Rating = require("./Rating");

User.hasMany(Store, {
  foreignKey: "ownerId"
});

Store.belongsTo(User, {
  foreignKey: "ownerId",
  as: "owner"
});

User.hasMany(Rating);

Rating.belongsTo(User);

Store.hasMany(Rating);

Rating.belongsTo(Store);

module.exports = {
  User,
  Store,
  Rating
};