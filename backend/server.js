require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const {
  sequelize
} = require("./models");

app.use(cors());
app.use(express.json());

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/admin",
  require("./routes/adminRoutes")
);

app.use(
  "/api/store",
  require("./routes/storeRoutes")
);

app.use(
  "/api/rating",
  require("./routes/ratingRoutes")
);

sequelize.sync({ alter: true })
.then(() => {

  app.listen(
    process.env.PORT,
    () => {
      console.log(
        `Server running on ${process.env.PORT}`
      );
    }
  );

});