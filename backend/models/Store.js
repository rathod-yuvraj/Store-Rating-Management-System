module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Store", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING
  });
};