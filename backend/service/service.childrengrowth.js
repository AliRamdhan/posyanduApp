const ChildrenGrowth = require("../models/model.children.growth");
const Children = require("../models/model.children");
const xl = require("excel4node");
const { formatDate } = require("../utils/FormatTime");
const getAll = async (req, res) => {
  try {
    const data = await ChildrenGrowth.find()
      .populate({
        path: "childrens",
        match: childrensMatch,
      })
      .populate("imunisations");
    return res.status(200).json({
      message: "List All Data",
      data,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Function to get all children growth records
const getAllGrowth = async (
  filter = {},
  sortOptions = {},
  skip = 0,
  limit = 10,
  childrensMatch = {}
) => {
  try {
    const totalDocuments = await ChildrenGrowth.countDocuments(filter);

    const findQuery = await ChildrenGrowth.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .populate({
        path: "childrens",
        match: childrensMatch,
      });

    const filteredData = findQuery.filter((doc) => doc.childrens);

    return { data: filteredData, total: totalDocuments };
  } catch (error) {
    throw error;
  }
};

const getBaduta = async () => {
  try {
    const data = await ChildrenGrowth.find({ isBaduta: true }).populate(
      "childrens imunisations"
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const getChild = async (childId) => {
  try {
    const existingChild = await Children.findOne({ _id: childId });
    if (!existingChild) {
      return null;
    }
    const data = await ChildrenGrowth.find({
      childrens: existingChild,
    }).populate("childrens imunisations");
    return data;
  } catch (error) {
    throw error;
  }
};

// Function to get a children growth record by ID
const getById = async (id) => {
  try {
    const data = await ChildrenGrowth.findById(id).populate(
      "childrens imunisations"
    );
    if (!data) {
      throw new Error("Children growth record not found");
    }
    return data;
  } catch (error) {
    throw error;
  }
};

// Function to create a new children growth record
const createData = async (growthData) => {
  try {
    const data = new ChildrenGrowth(growthData);
    await data.save();
    return data;
  } catch (error) {
    throw error;
  }
};

// Function to update a children growth record by ID
const updateData = async (id, growthData) => {
  try {
    const growth = await ChildrenGrowth.findById(id);
    if (!growth) {
      throw new Error("Children growth record not found");
    }
    await ChildrenGrowth.updateOne({ _id: id }, growthData);
    return await ChildrenGrowth.findById(id).populate("childrens imunisations"); // Returning the updated document
  } catch (error) {
    throw error;
  }
};

// Function to delete a children growth record by ID
const deleteData = async (id) => {
  try {
    const data = await ChildrenGrowth.findById(id);
    if (!data) {
      throw new Error("Children growth record not found");
    }
    await ChildrenGrowth.deleteOne({ _id: id });
    return { message: "Children growth record deleted successfully" };
  } catch (error) {
    throw error;
  }
};

const exportDataToExcel = async (year, monthIndex) => {
  try {
    const startDate = new Date(year, monthIndex - 1, 1);
    const endDate = new Date(year, monthIndex, 0, 23, 59, 59);

    const data = await ChildrenGrowth.find({
      checkDate: { $gte: startDate, $lte: endDate },
    }).populate("childrens imunisations");

    const wb = new xl.Workbook();
    const ws = wb.addWorksheet(`Laporan Data Kelahiran ${monthIndex}`);
    for (let i = 1; i <= 8; i++) {
      ws.column(i).setWidth(15);
    }

    const headingColumnNames = [
      "ID",
      "Nama Anak",
      "NIK Anak",
      "Tinggi Badan",
      "Berat Badan",
      "Kelompok Umur",
      "Gender",
      "Tempat, Tanggal Lahir",
      "Imunisasi Terakhir",
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
        ws.cell(rowIndex, 2).string(record.childrens?.name || "");
        ws.cell(rowIndex, 3).string(record.childrens?.nik || "");
        ws.cell(rowIndex, 4).string(`${record.heightBody.toString()} cm`);
        ws.cell(rowIndex, 5).string(`${record.weightBody.toString()} kg`);
        ws.cell(rowIndex, 6).string(record.groupFase || "");
        ws.cell(rowIndex, 7).string(record.childrens?.gender || "");
        ws.cell(rowIndex, 8).date(record.childrens?.dob || "");
        ws.cell(rowIndex, 9).string(
          record.imunisations?.name || "Tidak Imunisasi"
        );
        ws.cell(rowIndex, 10).date(record.checkDate);
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
  getAllGrowth,
  getBaduta,
  createData,
  getById,
  updateData,
  deleteData,
  getChild,
  exportDataToExcel,
};
