const Imunisation = require("../models/model.immunisation");
const xl = require("excel4node");

const GetAll = async (req, res) => {
  try {
    const data = await Imunisation.find();
    return res.status(200).json({
      message: "List All Data",
      data,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const GetAllData = async (req, res) => {
  try {
    const {
      name,
      groupAge,
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
    if (groupAge) filter.groupAge = groupAge;

    const sortOptions = {};
    if (sortField) sortOptions[sortField] = sortOrder === "desc" ? -1 : 1;

    const countDocumentsPromise = Imunisation.countDocuments(filter);
    const findQuery = Imunisation.find(filter)
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
    const data = await Imunisation.findOne({ _id: req.params.id });
    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }
    return res.status(200).json({ message: "Details Data", data });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const CreateData = async (req, res) => {
  const { name, groupAge, descriptionPrevented } = req.body;
  try {
    const data = await new Imunisation({
      name: name,
      groupAge: groupAge,
      descriptionPrevented: descriptionPrevented,
    }).save();
    return res.status(201).json({ message: "Success create data", data });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const UpdateData = async (req, res) => {
  const { name, groupAge, descriptionPrevented } = req.body;
  const updateFields = {};
  try {
    if (name) {
      updateFields.name = name;
    }
    if (groupAge) {
      updateFields.groupAge = groupAge;
    }
    if (descriptionPrevented) {
      updateFields.descriptionPrevented = descriptionPrevented;
    }
    const imunisations = await Imunisation.findOne({ _id: req.params.id });
    if (!imunisations) {
      return res.status(404).json({ message: "Data not found" });
    }

    const data = await Imunisation.updateOne(
      { _id: req.params.id },
      updateFields
    );
    return res.status(200).json({ message: "Data was updated", data });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const DeleteData = async (req, res) => {
  try {
    const imunisations = await Imunisation.deleteOne({ _id: req.params.id });
    if (!imunisations) {
      return res.status(404).json({ message: "Data not found" });
    }
    return res.status(200).json({ message: "Data was deleted" });
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

    const data = await Imunisation.find({
      createdAt: { $gte: startDate, $lte: endDate },
    });

    const wb = new xl.Workbook();
    const ws = wb.addWorksheet(`Laporan Data Imunisasi ${month}`);
    for (let i = 1; i <= 4; i++) {
      ws.column(i).setWidth(20);
    }
    // Define the specific columns you want in the Excel
    const headingColumnNames = [
      "ID",
      "Nama Imunisasi",
      "Kelompok Umur Imunisasi",
      "Deskripsi Imunisasi",
    ];

    // Write Column Titles in Excel file
    let headingColumnIndex = 1;
    headingColumnNames.forEach((heading) => {
      ws.cell(1, headingColumnIndex++).string(heading);
    });

    if (data.length > 0) {
      let rowIndex = 2;
      data.forEach((record) => {
        ws.cell(rowIndex, 1).string(record._id.toString());
        ws.cell(rowIndex, 2).string(record.name || "");
        ws.cell(rowIndex, 3).string(`${record.groupAge}` || "");
        ws.cell(rowIndex, 4).string(record.descriptionPrevented || "");

        rowIndex++;
      });
    } else {
      ws.row(2).setHeight(20);
      ws.cell(2, 1, 2, 5, true)
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

    const fileName = `Laporan Data Imunisasi tahun ${year} bulan ${monthIndex}.xlsx`;

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
  ExportDataToExcel,
};
