const router =
  require("express").Router();

const auth =
  require("../controllers/authController");

const authMiddleware =
  require("../middleware/authMiddleware");

router.post(
  "/register",
  auth.register
);

router.post(
  "/login",
  auth.login
);

router.put(
  "/change-password",
  authMiddleware,
  auth.changePassword
);

module.exports = router;