const router =
require("express").Router();

const rating =
require("../controllers/ratingController");

const auth =
require("../middleware/authMiddleware");

router.post(
  "/submit",
  auth,
  rating.submitRating
);

module.exports = router;