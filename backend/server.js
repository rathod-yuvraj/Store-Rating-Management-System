require("dotenv").config();

const app = require("./app");

const {
  connectDB,
  sequelize
} = require("./config/db");

const PORT =
  process.env.PORT || 5000;

const startServer = async () => {

  try {

    await connectDB();

    await sequelize.sync({
      alter: true
    });

    console.log(
      "Database Synced"
    );

    app.listen(PORT, () => {

      console.log(
        `Server Running On Port ${PORT}`
      );

    });

  } catch (error) {

    console.error(
      error.message
    );

  }
};

startServer();