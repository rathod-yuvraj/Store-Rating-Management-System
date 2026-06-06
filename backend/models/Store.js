module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define("Store", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      unique: true
    },

    address: {
      type: DataTypes.STRING(400)
    }
  });

  return Store;
};

// module.exports = (sequelize, DataTypes) => {
//   return sequelize.define("Store", {
//     name: DataTypes.STRING,
//     email: DataTypes.STRING,
//     address: DataTypes.STRING
//   });
// };