const Birth = require("../models/model.birth");
const Mother = require("../models/model.mother");
const xl = require("excel4node");

// Function to get all birth records without paging
const getAll = async (req, res) => {
  try {
    const data = await Birth.find()
      .populate("children")
      .populate({
        path: "children",
        populate: {
          path: "mother",
        },
      })
      .exec();
    return res.status(200).json({
      message: "List All Data",
      data,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
// Function to get all birth records with paging
const getAllBirth = async (
  filter = {},
  sortOptions = {},
  skip = 0,
  limit = 10
) => {
  try {
    const findQuery = await Birth.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .populate("children")
      .populate({
        path: "children",
        populate: {
          path: "mother",
        },
      })
      .exec();
    const countDocumentsPromise = await Birth.countDocuments(filter);
    const [data, total] = await Promise.all([findQuery, countDocumentsPromise]);
    return { data, total };
  } catch (error) {
    throw error;
  }
};

const exportDataToExcel = async (year, monthIndex) => {
  try {
    const startDate = new Date(year, monthIndex - 1, 1);
    const endDate = new Date(year, monthIndex, 0, 23, 59, 59);

    const data = await Birth.find({
      createdAt: { $gte: startDate, $lte: endDate },
    })
      .populate("children")
      .populate({
        path: "children",
        populate: {
          path: "mother",
        },
      });

    const wb = new xl.Workbook();
    const ws = wb.addWorksheet(`Laporan Data Kelahiran ${monthIndex}`);
    for (let i = 1; i <= 8; i++) {
      ws.column(i).setWidth(15);
    }

    const headingColumnNames = [
      "ID",
      "Nama",
      "Gender",
      "Tempat, Tanggal Lahir",
      "Lingkar Kepala",
      "Tinggi Badan",
      "Berat Badan",
      "Nama Ibu",
    ];

    let headingColumnIndex = 1;
    headingColumnNames.forEach((heading) => {
      ws.cell(1, headingColumnIndex++).string(heading);
    });

    if (data.length > 0) {
      let rowIndex = 2;
      data.forEach((record) => {
        ws.cell(rowIndex, 1).string(record._id.toString());
        ws.cell(rowIndex, 2).string(record.children?.name || "");
        ws.cell(rowIndex, 3).string(record.children?.gender || "");
        ws.cell(rowIndex, 4).date(record.dob);
        ws.cell(rowIndex, 5).string(`${record.circumHead.toString()} cm`);
        ws.cell(rowIndex, 6).string(`${record.heightBody.toString()} cm`);
        ws.cell(rowIndex, 7).string(`${record.weightBody.toString()} kg`);
        ws.cell(rowIndex, 8).string(record.children?.mother?.name || "");

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

// Function to get a birth record by ID
const getBirthById = async (id) => {
  try {
    const birth = await Birth.findById(id)
      .populate("children")
      .populate({
        path: "children",
        populate: {
          path: "mother",
        },
      });
    if (!birth) {
      throw new Error("Birth record not found");
    }
    return birth;
  } catch (error) {
    throw error;
  }
};

// Function to create a new birth record
const createBirth = async (birthData) => {
  try {
    const birth = new Birth(birthData);
    await birth.save();
    return birth;
  } catch (error) {
    throw error;
  }
};

// Function to update a birth record by ID
const updateBirth = async (id, birthData) => {
  try {
    const birth = await Birth.findById(id);
    if (!birth) {
      throw new Error("Birth record not found");
    }
    await Birth.updateOne({ _id: id }, birthData);
    return await Birth.findById(id); // Returning the updated document
  } catch (error) {
    throw error;
  }
};

// Function to delete a birth record by ID
const deleteBirth = async (id) => {
  try {
    const birth = await Birth.findById(id);
    if (!birth) {
      throw new Error("Birth record not found");
    }
    await Birth.deleteOne({ _id: id });
    return { message: "Birth record deleted successfully" };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAll,
  getAllBirth,
  createBirth,
  getBirthById,
  updateBirth,
  deleteBirth,
  exportDataToExcel,
};
