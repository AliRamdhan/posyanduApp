const express = require("express");
const router = express.Router();
const {
  GetAll,
  GetAllData,
  CreateData,
  GetDataById,
  UpdateData,
  DeleteData,
  GetAllDatabyMother,
  ExportDataToExcel,
  GetAllBaduta,
  GetAllBalita,
} = require("../controller/controller.child");

router.get("/all", GetAll);
router.get("/", GetAllData);
router.get("/baduta", GetAllBaduta);
router.get("/balita", GetAllBalita);
router.get("/mother/:id", GetAllDatabyMother);
router.get("/:id", GetDataById);
router.post("/create", CreateData);
router.put("/update/:id", UpdateData);
router.delete("/delete/:id", DeleteData);
router.get("/export/excel", ExportDataToExcel);

module.exports = router;
