const router =
require("express").Router();

const storeController =
require("../controllers/storeController");

const auth =
require("../middleware/authMiddleware");

const role =
require("../middleware/roleMiddleware");



router.get(
  "/all",
  auth,
  storeController.getAllStores
);



router.get(
  "/search",
  auth,
  storeController.searchStore
);



router.get(
  "/owner-dashboard",
  auth,
  role("STORE_OWNER"),
  storeController.ownerDashboard
);

module.exports = router;