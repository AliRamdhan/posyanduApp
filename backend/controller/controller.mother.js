const Mother = require("../models/model.mother");
const { Parser } = require("json2csv");
const xl = require("excel4node");
// const GetAllData = async (req, res) => {
//   try {
//     const data = await Mother.find();
//     return res.status(200).json({
//       message: "List All Data",
//       data,
//     });
//   } catch (error) {
//     return res.status(400).json({ error: error.message });
//   }
// };
// const GetAllData = async (req, res) => {
//   try {
//     const {
//       name,
//       husband,
//       dob,
//       ks,
//       bpjs,
//       sortField,
//       sortOrder = "asc",
//       page = 1,
//       limit = 10,
//     } = req.query;

//     const filter = {};
//     if (name) filter.name = name;
//     if (husband) filter.husband = husband;
//     if (dob) filter.dob = new Date(dob);
//     if (ks) filter.ks = ks;
//     if (bpjs !== undefined) filter.bpjs = bpjs === "true";

//     const sortOptions = {};
//     if (sortField) sortOptions[sortField] = sortOrder === "desc" ? -1 : 1;

//     const data = await Mother.find(filter)
//       .sort(sortOptions)
//       .skip((page - 1) * limit)
//       .limit(parseInt(limit));

//     return res.status(200).json({
//       message: "List All Data",
//       data,
//       pagination: {
//         page,
//         limit,
//         total: await Mother.countDocuments(filter),
//       },
//     });
//   } catch (error) {
//     return res.status(400).json({ error: error.message });
//   }
// };
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
      limit = 10,
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
  } = req.body;
  try {
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
  } = req.body;
  const updateFields = {};
  try {
    if (name) {
      updateFields.name = name;
    }
    if (nik) {
      updateFields.nik = nik;
    }
    if (kk) {
      updateFields.kk = kk;
    }
    if (husband) {
      updateFields.husband = husband;
    }
    if (husbandnik) {
      updateFields.husbandnik = husbandnik;
    }
    if (dob) {
      updateFields.dob = dob;
    }
    if (bpjs) {
      updateFields.bpjs = bpjs;
    }
    if (ks) {
      updateFields.ks = ks;
    }
    if (rt) {
      updateFields.rt = rt;
    }
    if (rw) {
      updateFields.rw = rw;
    }
    if (amountChild) {
      updateFields.amountChild = amountChild;
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

    const wb = new xl.Workbook();
    const ws = wb.addWorksheet("Mothers Data");

    // Define the specific columns you want in the Excel
    const headingColumnNames = [
      "ID",
      "Name",
      "NIK",
      "Suami",
      "NIK Suami",
      "No KK",
      "Date of Birth",
      "Punya BPJS",
      "Tipe ks",
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
    let rowIndex = 2;
    data.forEach((record) => {
      console.log(record.rt);
      console.log(record.rw);
      ws.cell(rowIndex, 1).string(record._id.toString());
      ws.cell(rowIndex, 2).string(record.name);
      ws.cell(rowIndex, 3).string(record.nik);
      ws.cell(rowIndex, 4).string(record.husband);
      ws.cell(rowIndex, 5).string(record.husbandnik);
      ws.cell(rowIndex, 6).string(record.kk);
      ws.cell(rowIndex, 7).date(new Date(record.dob));
      ws.cell(rowIndex, 8).string(record.bpjs ? "Punya" : "Tidak Punya");
      ws.cell(rowIndex, 9).string(record.ks);
      ws.cell(rowIndex, 10).string(record.rt.toString());
      ws.cell(rowIndex, 11).string(record.rw.toString());
      ws.cell(rowIndex, 12).number(record.amountChild);
      rowIndex++;
    });

    const fileName = `mothers_${year}_${monthIndex}.xlsx`;

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

    wb.write(fileName, res);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  GetAllData,
  CreateData,
  GetDataById,
  UpdateData,
  DeleteData,
  ExportDataToCSV,
  ExportDataToExcel,
};
