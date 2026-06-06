const router =
require("express").Router();

const authController =
require("../controllers/authController");

const auth =
require("../middleware/authMiddleware");



router.post(
  "/register",
  authController.register
);

router.post(
  "/login",
  authController.login
);



router.put(
  "/change-password",
  auth,
  authController.changePassword
);

module.exports = router;