const router =
require("express").Router();

const ratingController =
require("../controllers/ratingController");

const auth =
require("../middleware/authMiddleware");

/*

Submit Rating

*/

router.post(
  "/submit",
  auth,
  ratingController.submitRating
);

/*
My Ratings

*/

router.get(
  "/my-ratings",
  auth,
  ratingController.myRatings
);

/*
Store Ratings
*/

router.get(
  "/store/:storeId",
  auth,
  ratingController.storeRatings
);

module.exports = router;