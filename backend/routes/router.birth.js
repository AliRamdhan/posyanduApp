const router = require("express").Router();
const birthController = require("../controller/controller.birth");

// Route to get all birth records
router.get("/", birthController.getAllBirth);
router.get("/export/excel", birthController.exportDataExcel);
// Route to get a birth record by ID
router.get("/:id", birthController.getBirthById);

// Route to create a new birth record
router.post("/create", birthController.createBirth);

// Route to update a birth record by ID
router.put("/update/:id", birthController.updateBirth);

// Route to delete a birth record by ID
router.delete("/delete/:id", birthController.deleteBirth);

module.exports = router;
