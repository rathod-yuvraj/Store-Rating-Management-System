const router =
require("express").Router();

const adminController =
require("../controllers/adminController");

const auth =
require("../middleware/authMiddleware");

const role =
require("../middleware/roleMiddleware");


router.use(auth);

router.use(
  role("ADMIN")
);



router.get(
  "/dashboard",
  adminController.dashboard
);



router.post(
  "/users",
  adminController.addUser
);

router.get(
  "/users",
  adminController.getUsers
);

router.get(
  "/users/:id",
  adminController.getUserDetails
);



router.post(
  "/stores",
  adminController.addStore
);

router.get(
  "/stores",
  adminController.getStores
);

module.exports = router;