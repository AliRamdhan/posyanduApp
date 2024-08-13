const express = require("express");
const router = express.Router();
const {
  GetAllData,
  GetAllPregnant,
  CreateData,
  GetDataById,
  UpdateData,
  DeleteData,
  ExportDataToCSV,
  ExportDataToExcel,
  GetAll,
} = require("../controller/controller.mother");

router.get("/", GetAllData);
router.get("/all/pregnant", GetAllPregnant);
router.get("/all", GetAll);
router.get("/:id", GetDataById);
router.post("/create", CreateData);
router.put("/update/:id", UpdateData);
router.delete("/delete/:id", DeleteData);
router.get("/export/csv", ExportDataToCSV);
router.get("/export/excel", ExportDataToExcel);
module.exports = router;
