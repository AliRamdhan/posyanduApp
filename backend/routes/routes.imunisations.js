const express = require("express");
const router = express.Router();
const {
  GetAllData,
  CreateData,
  GetDataById,
  UpdateData,
  DeleteData,
  ExportDataToExcel
} = require("../controller/controller.imunisations"); // Adjust path as per your project structure

// Define routes
router.get("/", GetAllData); // Route to get all data
router.get("/:id", GetDataById); // Route to get data by ID
router.post("/create", CreateData); // Route to create new data
router.put("/update/:id", UpdateData); // Route to update data by ID
router.delete("/delete/:id", DeleteData); // Route to delete data by ID
router.get("/export/excel", ExportDataToExcel); // Route to get data by ID

module.exports = router;
