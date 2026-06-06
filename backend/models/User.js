module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM("ADMIN","USER","OWNER"),
      defaultValue: "USER"
    }
  });
};