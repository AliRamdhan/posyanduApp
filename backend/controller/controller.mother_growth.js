const service = require("../service/service.mothergrowth");
const Mother = require("../models/model.mother");

const getAll = async (req, res) => {
  try {
    const data = await service.getAll();
    res.status(200).json({ message: "List All Data", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllGrowth = async (req, res) => {
  try {
    const {
      motherName,
      checkDate,
      height,
      weight,
      kbtype,
      pregnantStatus,
      wombAge,
      numbChild,
      groupFase,
      circumStomach,
      circumHand,
      sortField,
      sortOrder = "asc",
      page = 1,
      limit = 10,
    } = req.query;

    // Build the filter object based on the query parameters
    const filter = {};
    if (checkDate) filter.checkDate = new Date(checkDate);
    if (groupFase) filter.groupFase = groupFase;
    if (height) filter.height = height;
    if (weight) filter.weight = weight;
    if (kbtype) filter.kbtype = kbtype;
    if (pregnantStatus) filter.pregnantStatus = pregnantStatus;
    if (wombAge) filter.wombAge = wombAge;
    if (numbChild) filter.numbChild = numbChild;
    if (circumStomach) filter.circumStomach = circumStomach;
    if (circumHand) filter.circumHand = circumHand;

    // Build the sort options
    const sortOptions = {};
    if (sortField) sortOptions[sortField] = sortOrder === "desc" ? -1 : 1;

    // Calculate pagination options
    const skip = (page - 1) * limit;
    const limitNumber = parseInt(limit);

    // Create a match object for children's name filtering
    const motherMatch = motherName
      ? { name: { $regex: new RegExp("^" + motherName, "i") } }
      : {};

    const { data, total } = await service.getAllMother(
      filter,
      sortOptions,
      skip,
      limitNumber,
      motherMatch // Pass the match object to the service
    );

    // Respond with the data and pagination info
    res.status(200).json({
      message: "List All Data",
      data,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllPregnant = async (req, res) => {
  try {
    const data = await service.getPregnant();
    res.status(200).json({ message: "List All Data", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Handler to get a growth record by ID
const getGrowthById = async (req, res) => {
  try {
    const data = await service.getById(req.params.id);
    res.status(200).json({ message: "Details Data", data });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getGrowthByMother = async (req, res) => {
  try {
    const data = await service.getMother(req.params.motherId);
    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json({ message: "List All Data", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Handler to create a new growth record
const createGrowth = async (req, res) => {
  const {
    checkDate,
    height,
    weight,
    kbtype,
    pregnantStatus,
    wombAge,
    numbChild,
    groupFase,
    circumStomach,
    circumHand,
    mother,
  } = req.body;
  const growthData = {
    checkDate,
    height,
    weight,
    kbtype,
    pregnantStatus,
    wombAge,
    numbChild,
    groupFase,
    circumStomach,
    circumHand,
    mother,
  };
  try {
    // Check if the provided mother ID exists
    if (mother) {
      const motherExists = await Mother.findById(mother);
      if (!motherExists) {
        return res.status(404).json({ message: "Mother record not found" });
      }
    }

    const data = await service.createData(growthData);
    res.status(201).json({ message: "Created data successfully", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Handler to update a growth record by ID
const updateGrowth = async (req, res) => {
  const {
    checkDate,
    height,
    weight,
    kbtype,
    pregnantStatus,
    wombAge,
    numbChild,
    groupFase,
    circumStomach,
    circumHand,
    mother,
  } = req.body;
  const updateFields = {};

  try {
    if (checkDate) updateFields.checkDate = checkDate;
    if (height) updateFields.height = height;
    if (weight) updateFields.weight = weight;
    if (kbtype) updateFields.kbtype = kbtype;
    if (pregnantStatus) updateFields.pregnantStatus = pregnantStatus;
    if (wombAge) updateFields.wombAge = wombAge;
    if (numbChild) updateFields.numbChild = numbChild;
    if (groupFase) updateFields.groupFase = groupFase;
    if (circumStomach) updateFields.circumStomach = circumStomach;
    if (circumHand) updateFields.circumHand = circumHand;

    if (mother) {
      const existingMother = await Mother.findById(mother);
      if (!existingMother) {
        return res.status(404).json({ message: "Mother not found" });
      }
      updateFields.mother = mother;
    }

    const data = await service.updateData(req.params.id, updateFields);
    res.status(200).json({ message: "Data was updated", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Handler to delete a growth record by ID
const deleteGrowth = async (req, res) => {
  try {
    const growth = await service.deleteData(req.params.id);
    return res.status(200).json({ message: "Data was deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const exportDataExcel = async (req, res) => {
  try {
    const { month } = req.query;
    if (!month) {
      return res.status(400).json({ error: "Month is required" });
    }

    const [year, monthIndex] = month.split("-").map(Number);

    const wb = await service.exportDataToExcel(year, monthIndex);

    const fileName = `Laporan Data Perkembangan Ibu tahun ${year} bulan ${monthIndex}.xlsx`;

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

    wb.write(fileName, res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  getAllGrowth,
  getGrowthById,
  getGrowthByMother,
  createGrowth,
  updateGrowth,
  deleteGrowth,
  getAllPregnant,
  exportDataExcel,
};
