const Children = require("../models/model.children");
const Mother = require("../models/model.mother");
const childService = require("../service/service.children");
const xl = require("excel4node");

const GetAll = async (req, res) => {
  try {
    const data = await childService.getAll();
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
      nik,
      gender,
      dob,
      amountImunisation,
      sortField,
      sortOrder = "asc",
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};
    if (name) {
      filter.name = { $regex: new RegExp("^" + name, "i") };
    }
    if (nik) filter.nik = { $regex: new RegExp("^" + nik, "i") };
    if (dob) filter.dob = new Date(dob);
    if (gender) filter.gender = gender;
    if (amountImunisation) filter.amountImunisation = amountImunisation;

    const sortOptions = {};
    if (sortField) sortOptions[sortField] = sortOrder === "desc" ? -1 : 1;

    const countDocumentsPromise = Children.countDocuments(filter);
    const findQuery = Children.find(filter)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate("mother");

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

const GetAllDatabyMother = async (req, res) => {
  try {
    const existingMother = await Mother.findOne({ _id: req.params.id });
    if (!existingMother) {
      return res.status(404).json({ message: "Data not found" });
    }
    const data = await Children.find({ mother: existingMother }).populate(
      "mother"
    );
    return res.status(200).json({
      message: "List All Data",
      data,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const GetAllBaduta = async (req, res) => {
  try {
    const data = await childService.getAllBaduta();
    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }
    return res.status(200).json({
      message: "List All Data",
      data,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const GetAllBalita = async (req, res) => {
  try {
    const data = await childService.getAllBalita();
    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }
    return res.status(200).json({
      message: "List All Data",
      data,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const GetDataById = async (req, res) => {
  try {
    const data = await Children.findOne({ _id: req.params.id });
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
    gender,
    dob,
    amountImunisation,
    mother,
    isBaduta,
    isBalita,
  } = req.body;

  try {
    const existingMother = await Mother.findOne({ _id: mother });
    if (!existingMother) {
      return res.status(404).json({ message: "Data tidak dapat ditemukan" });
    }
    const existNik = await Children.findOne({ nik: nik });
    if (existNik) {
      return res.status(400).json({ message: "NIK telah digunakan" });
    }
    const data = await new Children({
      name: name,
      nik: nik,
      gender: gender,
      dob: dob,
      amountImunisation: amountImunisation,
      mother: existingMother,
      isBaduta: isBaduta,
      isBalita: isBalita,
    }).save();
    await Mother.findByIdAndUpdate(mother, { $inc: { amountChild: 1 } });
    return res.status(200).json({ message: "Success create data", data });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const UpdateData = async (req, res) => {
  const {
    name,
    nik,
    gender,
    dob,
    amountImunisation,
    mother,
    isBaduta,
    isBalita,
  } = req.body;
  const updateFields = {};
  try {
    if (name !== undefined) updateFields.name = name;
    if (nik !== undefined) updateFields.nik = nik;
    if (dob !== undefined) updateFields.dob = dob;
    if (gender !== undefined) updateFields.gender = gender;
    if (amountImunisation !== undefined)
      updateFields.amountImunisation = amountImunisation;
    if (mother !== undefined) updateFields.mother = mother;
    if (isBaduta !== undefined) updateFields.isBaduta = isBaduta;
    if (isBalita !== undefined) updateFields.isBalita = isBalita;

    const existingChildren = await Children.findOne({ _id: req.params.id });
    if (!existingChildren) {
      return res.status(404).json({ message: "Data not found" });
    }

    if (mother && existingChildren.mother.toString() !== mother) {
      const previousMotherId = existingChildren.mother;
      const newMother = await Mother.findOne({ _id: mother });
      if (!newMother) {
        return res.status(404).json({ message: "New mother not found" });
      }

      await Mother.findByIdAndUpdate(previousMotherId, {
        $inc: { amountChild: -1 },
      });
      await Mother.findByIdAndUpdate(mother, { $inc: { amountChild: 1 } });
    }

    const data = await Children.updateOne({ _id: req.params.id }, updateFields);
    return res.status(200).json({ message: "Data was updated", data });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const DeleteData = async (req, res) => {
  try {
    const existingChildren = await Children.findOne({ _id: req.params.id });
    if (!existingChildren) {
      return res.status(404).json({ message: "Data not found" });
    }
    const mother = existingChildren.mother;
    if (mother) {
      await Mother.findByIdAndUpdate(mother, {
        $inc: { amountChild: -1 },
      });
    }
    // const data = await Children.updateOne({ _id: req.params.id }, existingChildren);
    const data = await Children.deleteOne(existingChildren._id);
    // if (!data) {
    //   return res.status(404).json({ message: "Data not found" });
    // }
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

    if (!year || !monthIndex || monthIndex < 1 || monthIndex > 12) {
      return res.status(400).json({ error: "Invalid month format" });
    }

    const startDate = new Date(year, monthIndex - 1, 1);
    const endDate = new Date(year, monthIndex, 0, 23, 59, 59);

    const data = await Children.find({
      createdAt: { $gte: startDate, $lte: endDate },
    }).populate("mother");

    const wb = new xl.Workbook();
    const ws = wb.addWorksheet(`Laporan Data Anak ${month}`);
    for (let i = 1; i <= 8; i++) {
      ws.column(i).setWidth(i === 5 ? 20 : 15);
    }
    // Define the specific columns you want in the Excel
    const headingColumnNames = [
      "ID",
      "Name",
      "NIK",
      "Gender",
      "Tempat,Tanggal,Lahir",
      "Jumlah Imunisasi",
      "Nama Ibu",
    ];

    // Write Column Titles in Excel file
    let headingColumnIndex = 1;
    headingColumnNames.forEach((heading) => {
      ws.cell(1, headingColumnIndex++).string(heading);
    });

    if (data.length > 0) {
      // Write Data in Excel file
      let rowIndex = 2;
      data.forEach((record) => {
        ws.cell(rowIndex, 1).string(record._id.toString());
        ws.cell(rowIndex, 2).string(record.name || "");
        ws.cell(rowIndex, 3).string(record.nik || "");
        ws.cell(rowIndex, 4).string(record.gender || "");
        ws.cell(rowIndex, 5).date(record.dob || "");
        ws.cell(rowIndex, 6).string((record.amountImunisation || 0) + " kali");
        ws.cell(rowIndex, 7).string(record.mother?.name || "");
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

    const fileName = `Laporan Data Anak tahun ${year} bulan ${monthIndex}.xlsx`;

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
};
