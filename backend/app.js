const express = require("express");
const cors = require("cors");

const authRoutes =
  require("./routes/authRoutes");

const adminRoutes =
  require("./routes/adminRoutes");

const storeRoutes =
  require("./routes/storeRoutes");

const ratingRoutes =
  require("./routes/ratingRoutes");

const userRoutes =
  require("./routes/userRoutes");

const app = express();


app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));



app.get("/", (req, res) => {
  res.json({
    message:
      "Store Rating System API Running"
  });
});

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/api/store",
  storeRoutes
);

app.use(
  "/api/user",
  userRoutes
);

app.use(
  "/api/rating",
  ratingRoutes
);



app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found"
  });
});

module.exports = app;