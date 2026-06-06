const router =
require("express").Router();

const admin =
require("../controllers/adminController");

const auth =
require("../middleware/authMiddleware");

const role =
require("../middleware/roleMiddleware");

router.use(auth);
router.use(role("ADMIN"));

router.get(
  "/dashboard",
  admin.dashboard
);

router.post(
  "/users",
  admin.addUser
);

router.post(
  "/stores",
  admin.addStore
);

router.get(
  "/users",
  admin.getUsers
);

router.get(
  "/users/:id",
  admin.getUserDetails
);

router.get(
  "/stores",
  admin.getStores
);

module.exports = router;