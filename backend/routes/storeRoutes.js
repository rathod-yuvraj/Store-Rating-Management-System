const router =
require("express").Router();

const store =
require("../controllers/storeController");

const auth =
require("../middleware/authMiddleware");

router.get(
  "/all",
  auth,
  store.getAllStores
);

router.get(
  "/search",
  auth,
  store.searchStore
);

router.get(
  "/owner-dashboard",
  auth,
  store.ownerDashboard
);

module.exports = router;