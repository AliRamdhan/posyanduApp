const router = require("express").Router();
const controller = require("../controller/controller.child_growth");

// Route to get all children growth records
router.get("/", controller.getAllGrowth);
router.get("/baduta", controller.getAllBaduta);

// Route to get a children growth record by ID
router.get("/:id", controller.getGrowthById);

// Route to create a new children growth record
router.post("/create", controller.createGrowth);

// Route to update a children growth record by ID
router.put("/update/:id", controller.updateGrowth);

// Route to delete a children growth record by ID
router.delete("/delete/:id", controller.deleteGrowth);

module.exports = router;
