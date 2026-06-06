module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING(60),
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    address: {
      type: DataTypes.STRING(400)
    },

    role: {
      type: DataTypes.ENUM(
        "ADMIN",
        "USER",
        "OWNER"
      ),
      defaultValue: "USER"
    }
  });

  return User;
};


// module.exports = (sequelize, DataTypes) => {
//   return sequelize.define("User", {
//     name: DataTypes.STRING,
//     email: {
//       type: DataTypes.STRING,
//       unique: true
//     },
//     password: DataTypes.STRING,
//     address: DataTypes.STRING,
//     role: {
//       type: DataTypes.ENUM("ADMIN","USER","OWNER"),
//       defaultValue: "USER"
//     }
//   });
// };