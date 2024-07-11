const router = require("express").Router();
const {
  register,
  login,
  getUser,
} = require("../controller/auth/controller.auth");
const { authenticate, authorize } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/user/:id", authenticate, authorize("Admin"), getUser); // Only Admin can get user by id
router.get("/profile", authenticate, (req, res) => {
  const username = req.user.username;
  const email = req.user.email;
  const numberHp = req.user.numberHp;
  const role = req.user.role;
  const id = req.user._id
  const motherId = req.user.mother
  const data = {
    username,
    email,
    numberHp,
    role,
    id,
    motherId
  };
  res.json({ message: `Welcome ${req.user.username}`, data });
});

// Admin routes
router.get("/admin-only", authenticate, authorize("Admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

// User routes
router.get("/user-only", authenticate, authorize("User"), (req, res) => {
  res.json({ message: "Welcome User" });
});

module.exports = router;
