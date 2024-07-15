const express = require("express");
const xl = require("excel4node");
const router = express.Router();
const {
  GetAllData,
  CreateData,
  GetDataById,
  UpdateData,
  DeleteData,
  ExportDataToExcel,
} = require("../controller/controller.imunisations"); // Adjust path as per your project structure

// Define routes
router.get("/", GetAllData); // Route to get all data
router.get("/:id", GetDataById); // Route to get data by ID
router.post("/create", CreateData); // Route to create new data
router.put("/update/:id", UpdateData); // Route to update data by ID
router.delete("/delete/:id", DeleteData); // Route to delete data by ID
router.get("/export/excel", ExportDataToExcel); // Route to get data by ID

router.get("/export/excel/sample", (req, res) => {
  // Create a new instance of a Workbook class
  const wb = new xl.Workbook();

  // Add Worksheets to the workbook
  const ws = wb.addWorksheet("Laporan");

  // Define styles
  const headerStyle = wb.createStyle({
    font: {
      bold: true,
      size: 16,
    },
    alignment: {
      wrapText: true,
      horizontal: "center",
      vertical: "center",
    },
    border: {
      left: {
        style: "thin",
        color: "black",
      },
      right: {
        style: "thin",
        color: "black",
      },
      top: {
        style: "thin",
        color: "black",
      },
      bottom: {
        style: "thin",
        color: "black",
      },
    },
  });

  const subHeaderStyle = wb.createStyle({
    font: {
      bold: true,
      size: 12,
    },
    alignment: {
      wrapText: true,
      horizontal: "center",
      vertical: "center",
    },
    border: {
      left: {
        style: "thin",
        color: "black",
      },
      right: {
        style: "thin",
        color: "black",
      },
      top: {
        style: "thin",
        color: "black",
      },
      bottom: {
        style: "thin",
        color: "black",
      },
    },
  });

  const subSubHeaderStyle = wb.createStyle({
    font: {
      size: 12,
    },
    alignment: {
      wrapText: true,
      horizontal: "center",
      vertical: "center",
    },
    border: {
      left: {
        style: "thin",
        color: "black",
      },
      right: {
        style: "thin",
        color: "black",
      },
      top: {
        style: "thin",
        color: "black",
      },
      bottom: {
        style: "thin",
        color: "black",
      },
    },
  });

  // Set column widths
  ws.column(1).setWidth(15);
  ws.column(2).setWidth(15);
  ws.column(3).setWidth(15);
  ws.column(4).setWidth(15);
  ws.column(5).setWidth(15);
  ws.column(6).setWidth(15);
  ws.column(7).setWidth(15);
  ws.column(8).setWidth(15);
  ws.column(9).setWidth(15);
  ws.column(10).setWidth(15);
  ws.column(11).setWidth(15);
  ws.column(12).setWidth(15);
  ws.column(13).setWidth(15);
  ws.column(14).setWidth(15);

  // Set row heights
  ws.row(1).setHeight(30);
  ws.row(2).setHeight(30);
  ws.row(3).setHeight(30);
  ws.row(4).setHeight(30);
  ws.row(5).setHeight(50);
  ws.cell(6).style({
    border: {
      left: {
        style: "thin",
        color: "black",
      },
      right: {
        style: "thin",
        color: "black",
      },
      top: {
        style: "thin",
        color: "black",
      },
      bottom: {
        style: "thin",
        color: "black",
      },
    },
  });

  ws.row(7).setHeight(20);
  ws.row(9).setHeight(30);
  ws.row(10).setHeight(50);
  ws.row(12).setHeight(50);
  // ws.row(12).setHeight(20);
  // ws.row(13).setHeight(20);

  // Merge and set headers
  ws.cell(1, 1, 1, 15, true)
    .string("LAPORAN BULANAN KESEHATAN IBU DAN ANAK (KIA) TAHUN 2023")
    .style(headerStyle);
  ws.cell(2, 1, 2, 15, true)
    .string("RW")
    .style({
      font: {
        bold: true,
      },
      alignment: {
        wrapText: true,
        horizontal: "left",
        vertical: "center",
      },
    });
  ws.cell(3, 1, 3, 15, true)
    .string("Bulan")
    .style({
      font: {
        bold: true,
      },
      alignment: {
        wrapText: true,
        horizontal: "left",
        vertical: "center",
      },
    });

  //Sub Column 1
  //(rows start, col start, rows end, col end )
  ws.cell(4, 1, 4, 2, true).string("Calon Pengantin").style(subHeaderStyle);
  ws.cell(4, 3, 4, 6, true).string("Ibu Hamil").style(subHeaderStyle);
  ws.cell(4, 7, 4, 7, true).string("Persalinan").style(subHeaderStyle);
  ws.cell(4, 8, 4, 9, true).string("Kematian Anak").style(subHeaderStyle);
  ws.cell(4, 10, 4, 11, true).string("Pra Sekolah").style(subHeaderStyle);

  // Sub headers for "Calon Pengantin"
  const subCalonPengantin = [
    "Catin/ Yg Menikah Bulan Ini",
    "Catin Kek (Lila <23,5 cm) Bulan Ini",
  ];
  subCalonPengantin.forEach((title, index) => {
    ws.cell(5, 1 + index)
      .string(title)
      .style(subHeaderStyle);
  });

  // Sub headers for "Ibu Hamil"
  const subIbuHamil = [
    "Bumil baru",
    "Tinggi Badan Bumil <145 cm Bulan Ini",
    "Bumil Kek (Lila <23,5 cm) Bulan Ini",
    "Abortus/ Keguguran Bulan Ini",
  ];
  subIbuHamil.forEach((title, index) => {
    ws.cell(5, 3 + index)
      .string(title)
      .style(subHeaderStyle);
  });

  // Sub header for "Persalinan"
  ws.cell(5, 7).string("Persalinan Bulan Ini").style(subHeaderStyle);

  // Sub headers for "Kematian Anak"
  const subKematianAnak = [
    "Usia 29 Hari s.d. 11 Bulan",
    "Usia 12 Bulan s.d. 59 Bulan",
  ];
  subKematianAnak.forEach((title, index) => {
    ws.cell(5, 8 + index)
      .string(title)
      .style(subHeaderStyle);
  });

  // Sub header for "Pra Sekolah"
  ws.cell(5, 10, 5, 11, true).string("Usia 60 - 72").style(subHeaderStyle);

  // SKIP LINE
  ws.cell(6, 1, 7, 15, true).string(null);

  const sections = [
    { title: "Usia 0 - 59 Bulan", start: 1 },
    { title: "Anak yg Ultah 1 Tahun bulan ini", start: 4 },
    { title: "Anak yg Ultah 2 Tahun bulan ini", start: 7 },
    { title: "Anak yg Ultah 3 Tahun bulan ini", start: 10 },
    { title: "Anak yg Ultah 4 Tahun bulan ini", start: 13 },
    { title: "Anak yg Ultah 5 Tahun bulan ini", start: 16 },
  ];

  sections.forEach((section) => {
    ws.cell(8, section.start, 8, section.start + 2, true)
      .string(section.title)
      .style(subHeaderStyle);
    const subGender = ["L", "P", "Total"];
    subGender.forEach((title, index) => {
      ws.cell(9, section.start + index)
        .string(title)
        .style(subSubHeaderStyle);
    });
  });

  ws.cell(10, 1, 10, 15, true)
    .string("KEHAMILAN BARU")
    .style({
      font: {
        bold: true,
      },
      alignment: {
        wrapText: true,
        horizontal: "left",
        vertical: "center",
      },
    });

  const subKehamilanBaru = [
    "No",
    "Nama Ibu",
    "Usia Ibu",
    "Nama Suami",
    "Usia Suami",
    "NIK Ibu",
    "NIK Suami",
    "No KK",
    "Alamat (RT/RW)",
    "Anak Ke",
    "Usia Kehamilan",
    "BPJS (Ya/Tidak)",
    "Mampu/ Tidak Mampu",
    "Jarak Usia Anak Terakhir Berapa Tahun",
  ];
  subKehamilanBaru.forEach((title, index) => {
    ws.cell(11, 1 + index)
      .string(title)
      .style(subSubHeaderStyle);
  });

  ws.cell(12, 1, 12, 15, true)
    .string("KELAHIRAN BARU")
    .style({
      font: {
        bold: true,
      },
      alignment: {
        wrapText: true,
        horizontal: "left",
        vertical: "center",
      },
    });

  // Sub headers for KELAHIRAN BARU
  const subKelahiranBaru = [
    "No",
    "Nama Ibu",
    "Nama Suami",
    "Usia Ibu",
    "Usia Suami",
    "NIK Ibu",
    "No KK",
    "Alamat (RT/RW)",
    "Anak Ke",
    "Tanggal Lahir",
    "L/P",
    "BB",
    "PB",
    "Normal/SC",
    "Tempat Lahir",
  ];
  subKelahiranBaru.forEach((title, index) => {
    ws.cell(13, 1 + index)
      .string(title)
      .style(subSubHeaderStyle);
  });
  // Save the workbook and send it as a response
  wb.write("LaporanBulananKesehatan.xlsx", res);
});

module.exports = router;
