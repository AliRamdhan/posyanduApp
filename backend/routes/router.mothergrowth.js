const router = require("express").Router();
const controller = require("../controller/controller.mother_growth");

// Route to get all growth records
router.get("/", controller.getAllGrowth);
router.get("/pregnant", controller.getAllPregnant);
// Route to get a growth record by ID
router.get("/:id", controller.getGrowthById);

// Route to create a new growth record
router.post("/create", controller.createGrowth);

// Route to update a growth record by ID
router.put("/update/:id", controller.updateGrowth);

// Route to delete a growth record by ID
router.delete("/delete/:id", controller.deleteGrowth);

module.exports = router;
