const Mother = require("../models/model.mother");
const { Parser } = require("json2csv");
const xl = require("excel4node");
const formatTime = require("../utils/FormatTime");

const GetAll = async (req, res) => {
  try {
    const data = await Mother.find();
    return res.status(200).json({ message: "List All Data", data });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const GetAllPregnant = async (req, res) => {
  try {
    const data = await Mother.find({ isPregnant: true });
    return res.status(200).json({ message: "List All Data", data });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const GetAllData = async (req, res) => {
  try {
    const {
      name,
      husband,
      dob,
      ks,
      bpjs,
      sortField,
      sortOrder = "asc",
      page = 1,
      limit,
    } = req.query;

    const filter = {};
    if (name) {
      // Case insensitive search with partial matching
      filter.name = { $regex: new RegExp("^" + name, "i") };
    }
    if (husband) filter.husband = { $regex: new RegExp("^" + husband, "i") };
    if (dob) filter.dob = new Date(dob);
    if (ks) filter.ks = ks;
    if (bpjs !== undefined) filter.bpjs = bpjs === "true";

    const sortOptions = {};
    if (sortField) sortOptions[sortField] = sortOrder === "desc" ? -1 : 1;

    const countDocumentsPromise = Mother.countDocuments(filter);
    const findQuery = Mother.find(filter)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const [data, total] = await Promise.all([findQuery, countDocumentsPromise]);

    return res.status(200).json({
      message: "List All Data",
      data,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
      },
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const GetDataById = async (req, res) => {
  try {
    const data = await Mother.findOne({ _id: req.params.id });
    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }
    return res.status(200).json({ message: "Details Data", data });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const CreateData = async (req, res) => {
  const {
    name,
    nik,
    kk,
    husband,
    husbandnik,
    dob,
    bpjs,
    ks,
    rt,
    rw,
    amountChild,
    isPregnant,
    isBreastfeed,
  } = req.body;
  try {
    const existKK = await Mother.findOne({ kk: kk });
    if (existKK) {
      throw new Error("KK telah digunakan");
    }
    const existNik = await Mother.findOne({ nik: nik });
    if (existNik) {
      throw new Error("NIK telah digunakan");
    }
    const existNikHusb = await Mother.findOne({ husbandnik: husbandnik });
    if (existNikHusb) {
      throw new Error("NIK Suami telah digunakan");
    }
    const data = await new Mother({
      name: name,
      nik: nik,
      kk: kk,
      husband: husband,
      husbandnik: husbandnik,
      dob: dob,
      bpjs: bpjs,
      ks: ks,
      rt: rt,
      rw: rw,
      amountChild: amountChild,
      isPregnant: isPregnant,
      isBreastfeed: isBreastfeed,
    }).save();
    return res.status(201).json({ message: "Success create data", data });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const UpdateData = async (req, res) => {
  const {
    name,
    nik,
    kk,
    husband,
    husbandnik,
    dob,
    bpjs,
    ks,
    rt,
    rw,
    amountChild,
    isPregnant,
    isBreastfeed,
  } = req.body;

  const updateFields = {};

  try {
    if (name !== undefined) {
      updateFields.name = name;
    }
    if (nik !== undefined) {
      updateFields.nik = nik;
    }
    if (kk !== undefined) {
      updateFields.kk = kk;
    }
    if (husband !== undefined) {
      updateFields.husband = husband;
    }
    if (husbandnik !== undefined) {
      updateFields.husbandnik = husbandnik;
    }
    if (dob !== undefined) {
      updateFields.dob = dob;
    }
    if (bpjs !== undefined) {
      updateFields.bpjs = bpjs;
    }
    if (ks !== undefined) {
      updateFields.ks = ks;
    }
    if (rt !== undefined) {
      updateFields.rt = rt;
    }
    if (rw !== undefined) {
      updateFields.rw = rw;
    }
    if (amountChild !== undefined) {
      updateFields.amountChild = amountChild;
    }
    if (isPregnant !== undefined) {
      updateFields.isPregnant = isPregnant;
    }
    if (isBreastfeed !== undefined) {
      updateFields.isBreastfeed = isBreastfeed;
    }

    const existingMother = await Mother.findOne({ _id: req.params.id });
    if (!existingMother) {
      return res.status(404).json({ message: "Data not found" });
    }
    const data = await Mother.updateOne({ _id: req.params.id }, updateFields);
    return res.status(200).json({ message: "Data was updated", data });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const DeleteData = async (req, res) => {
  try {
    const data = await Mother.deleteOne({ _id: req.params.id });
    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }
    return res.status(200).json({ message: "Data was deleted" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const ExportDataToCSV = async (req, res) => {
  try {
    const { month } = req.query;
    if (!month) {
      return res.status(400).json({ error: "Month is required" });
    }

    const [year, monthIndex] = month.split("-").map(Number);
    const startDate = new Date(year, monthIndex - 1, 1);
    const endDate = new Date(year, monthIndex, 0, 23, 59, 59);

    const data = await Mother.find({
      createdAt: { $gte: startDate, $lte: endDate },
    });

    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "No data found for the specified month and year" });
    }

    const fields = [
      "name",
      "nik",
      "kk",
      "husband",
      "husbandnik",
      "dob",
      "bpjs",
      "ks",
      "rt",
      "rw",
      "amountChild",
    ];
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(data);

    const fileName = `mothers_${year}_${monthIndex}.csv`;

    // Set headers to prompt download
    res.set({
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="${fileName}"`,
    });

    res.send(csv); // Send CSV data directly to client for download
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const ExportDataToExcel = async (req, res) => {
  try {
    const { month } = req.query;
    if (!month) {
      return res.status(400).json({ error: "Month is required" });
    }

    const [year, monthIndex] = month.split("-").map(Number);

    if (!year || !monthIndex || monthIndex < 1 || monthIndex > 12) {
      return res.status(400).json({ error: "Invalid month format" });
    }

    const startDate = new Date(year, monthIndex - 1, 1);
    const endDate = new Date(year, monthIndex, 0, 23, 59, 59);

    let data = await Mother.find({
      createdAt: { $gte: startDate, $lte: endDate },
    });

    const wb = new xl.Workbook();
    const ws = wb.addWorksheet(`Laporan Data Ibu ${month}`);
    for (let i = 1; i <= 13; i++) {
      ws.column(i).setWidth(15);
    }
    // Define the specific columns you want in the Excel
    const headingColumnNames = [
      "ID",
      "Name",
      "NIK",
      "Suami",
      "NIK Suami",
      "No KK",
      "Tempat,Tanggal,Lahir",
      "Punya BPJS",
      "Tipe ks",
      "Status",
      "RT",
      "RW",
      "Jumlah Anak",
    ];

    // Write Column Titles in Excel file
    let headingColumnIndex = 1;
    headingColumnNames.forEach((heading) => {
      ws.cell(1, headingColumnIndex++).string(heading);
    });

    // Write Data in Excel file
    if (data.length > 0) {
      let rowIndex = 2;
      data.forEach((record) => {
        ws.cell(rowIndex, 1).string(record._id.toString());
        ws.cell(rowIndex, 2).string(record.name);
        ws.cell(rowIndex, 3).string(record.nik);
        ws.cell(rowIndex, 4).string(record.husband);
        ws.cell(rowIndex, 5).string(record.husbandnik);
        ws.cell(rowIndex, 6).string(record.kk);
        ws.cell(rowIndex, 7).date(record.dob);
        ws.cell(rowIndex, 8).string(record.bpjs ? "Punya" : "Tidak Punya");
        ws.cell(rowIndex, 9).string(record.ks);
        ws.cell(rowIndex, 10).string(
          record.isPregnant ? "Hamil" : "Tidak Hamil"
        );
        ws.cell(rowIndex, 11).string(record.rt.toString());
        ws.cell(rowIndex, 12).string(record.rw.toString());
        ws.cell(rowIndex, 13).string(`${record.amountChild} anak`);
        rowIndex++;
      });
    } else {
      ws.row(2).setHeight(20);
      ws.cell(2, 1, 2, 7, true)
        .string("Tidak ada data di bulan ini")
        .style({
          font: {
            bold: true,
          },
          alignment: {
            wrapText: true,
            horizontal: "center",
            vertical: "center",
          },
        });
    }

    const fileName = `Laporan Data Ibu tahun ${year} bulan ${monthIndex}.xlsx`;

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

    wb.write(fileName, res);
  } catch (error) {
    console.error("Error in ExportDataToExcel:", error);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  GetAll,
  GetAllPregnant,
  GetAllData,
  CreateData,
  GetDataById,
  UpdateData,
  DeleteData,
  ExportDataToCSV,
  ExportDataToExcel,
};
