const Growth = require("../models/model.mother.growth");
const Mother = require("../models/model.mother");
const xl = require("excel4node");
const getAll = async (req, res) => {
  try {
    const mother = await Growth.find().populate("mother");
    return mother;
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getAllMother = async (
  filter = {},
  sortOptions = {},
  skip = 0,
  limit = 10,
  populateMatch = {}
) => {
  try {
    const totalDocuments = await Growth.countDocuments(filter);

    const findQuery = await Growth.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .populate({
        path: "mother",
        match: populateMatch,
      });

    const filteredData = findQuery.filter((doc) => doc.mother);

    return { data: filteredData, total: totalDocuments };
  } catch (error) {
    throw error;
  }
};

const getPregnant = async () => {
  try {
    const data = await Growth.find({ pregnantStatus: true }).populate("mother");
    return data;
  } catch (error) {
    throw error;
  }
};

const getMother = async (motherId) => {
  try {
    const existingMother = await Mother.findOne({ _id: motherId });
    if (!existingMother) {
      return null;
    }
    const data = await Growth.find({
      mother: existingMother,
    }).populate("mother");
    return data;
  } catch (error) {
    throw error;
  }
};

// Function to get a birth record by ID
const getById = async (id) => {
  try {
    const data = await Growth.findById(id).populate("mother");
    if (!data) {
      throw new Error("Growth record not found");
    }
    return data;
  } catch (error) {
    throw error;
  }
};

// Function to create a new birth record
const createData = async (growthData) => {
  try {
    const data = new Growth(growthData);
    await data.save();
    return data;
  } catch (error) {
    throw error;
  }
};

// Function to updateData a birth record by ID
const updateData = async (id, growthData) => {
  try {
    const birth = await Growth.findById(id);
    if (!birth) {
      throw new Error("Birth record not found");
    }
    await Growth.updateOne({ _id: id }, growthData);
    return await Growth.findById(id); // Returning the updated document
  } catch (error) {
    throw error;
  }
};

// Function to delete a birth record by ID
const deleteData = async (id) => {
  try {
    const data = await Growth.findById(id);
    if (!data) {
      throw new Error("Data record not found");
    }
    await Growth.deleteOne({ _id: id });
    return { message: "Data record deleted successfully" };
  } catch (error) {
    throw error;
  }
};

const exportDataToExcel = async (year, monthIndex) => {
  try {
    const startDate = new Date(year, monthIndex - 1, 1);
    const endDate = new Date(year, monthIndex, 0, 23, 59, 59);

    const data = await Growth.find({
      checkDate: { $gte: startDate, $lte: endDate },
    }).populate("mother");

    const wb = new xl.Workbook();
    const ws = wb.addWorksheet(`Laporan Data Perkembangan Ibu ${monthIndex}`);
    for (let i = 1; i <= 8; i++) {
      ws.column(i).setWidth(15);
    }

    const headingColumnNames = [
      "ID",
      "Nama Ibu",
      "NIK Ibu",
      "Tinggi Badan",
      "Berat Badan",
      "Hamil",
      "Anak ke-",
      "Lingkar Badan",
      "Lingkar Tangan",
      "Tipe KB",
      "Tempat, Tanggal Lahir",
      "Tanggal Periksa",
    ];

    let headingColumnIndex = 1;
    headingColumnNames.forEach((heading) => {
      ws.cell(1, headingColumnIndex++).string(heading);
    });

    if (data.length > 0) {
      let rowIndex = 2;
      data.forEach((record) => {
        ws.cell(rowIndex, 1).string(record._id.toString());
        ws.cell(rowIndex, 2).string(record.mother?.name || "");
        ws.cell(rowIndex, 3).string(record.mother?.nik || "");
        ws.cell(rowIndex, 4).string(`${record.height.toString()} cm`);
        ws.cell(rowIndex, 5).string(`${record.weight.toString()} kg`);
        ws.cell(rowIndex, 6).string(
          record.wombAge === 0 ||
            record.wombAge === null ||
            record.groupFase === "None"
            ? "Tidak Hamil"
            : `${record.wombAge} Bulan`
        );
        ws.cell(rowIndex, 7).string(`ke-${record.numbChild}`);
        ws.cell(rowIndex, 8).string(`${record.circumStomach.toString()} cm`);
        ws.cell(rowIndex, 9).string(`${record.circumHand.toString()} cm`);
        ws.cell(rowIndex, 10).string(record.kbtype || "");
        ws.cell(rowIndex, 11).date(record.mother?.dob || "");
        ws.cell(rowIndex, 12).date(record.checkDate);
        rowIndex++;
      });
    } else {
      ws.row(2).setHeight(20);
      ws.cell(2, 1, 2, 8, true)
        .string("Tidak ada data di bulan ini")
        .style({
          font: { bold: true },
          alignment: {
            wrapText: true,
            horizontal: "center",
            vertical: "center",
          },
        });
    }

    return wb;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAll,
  getAllMother,
  createData,
  getById,
  getMother,
  updateData,
  deleteData,
  getPregnant,
  exportDataToExcel,
};
