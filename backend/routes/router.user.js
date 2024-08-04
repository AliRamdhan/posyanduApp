const router = require("express").Router();
const userController = require("../controller/controller.user");

router.get("/", userController.getAll);
router.get("/page", userController.getAllUser);
router.get("/:id", userController.getByIdUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
