module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Rating", {
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5
      }
    }
  });
};