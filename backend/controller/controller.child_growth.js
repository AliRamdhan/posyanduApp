const service = require("../service/service.childrengrowth");
const Children = require("../models/model.children");
const Imunisations = require("../models/model.immunisation");

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
      childrensName,
      checkDate,
      groupFase,
      heightBody,
      weightBody,
      sortField,
      isBaduta,
      sortOrder = "asc",
      page = 1,
      limit = 10,
    } = req.query;

    // Build the filter object based on the query parameters
    const filter = {};
    if (checkDate) filter.checkDate = new Date(checkDate);
    if (groupFase) filter.groupFase = groupFase;
    if (heightBody) filter.heightBody = heightBody;
    if (weightBody) filter.weightBody = weightBody;
    if (isBaduta) filter.isBaduta = isBaduta;

    // Build the sort options
    const sortOptions = {};
    if (sortField) sortOptions[sortField] = sortOrder === "desc" ? -1 : 1;

    // Calculate pagination options
    const skip = (page - 1) * limit;
    const limitNumber = parseInt(limit);

    // Create a match object for children's name filtering
    const childrensMatch = childrensName
      ? { name: { $regex: new RegExp("^" + childrensName, "i") } }
      : {};

    const { data, total } = await service.getAllGrowth(
      filter,
      sortOptions,
      skip,
      limitNumber,
      childrensMatch // Pass the match object to the service
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

const getAllBaduta = async (req, res) => {
  try {
    const data = await service.getBaduta();
    res.status(200).json({ message: "List All Data", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGrowthByChildren = async (req, res) => {
  try {
    const data = await service.getChild(req.params.childId);
    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json({ message: "List All Data", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Handler to get a children growth record by ID
const getGrowthById = async (req, res) => {
  try {
    const data = await service.getById(req.params.id);
    res.status(200).json({ message: "Details Data", data });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Handler to create a new children growth record
const createGrowth = async (req, res) => {
  let {
    checkDate,
    groupFase,
    childrens,
    heightBody,
    weightBody,
    imunisations,
  } = req.body;

  // If imunisations is an empty string, set it to null
  if (imunisations === "") {
    imunisations = null;
  }

  const growthData = {
    checkDate,
    groupFase,
    childrens,
    heightBody,
    weightBody,
    imunisations,
  };

  try {
    // Check if the provided children ID exists
    if (childrens !== "") {
      const childrenExists = await Children.findById(childrens);
      if (!childrenExists) {
        return res.status(404).json({ message: "Children record not found" });
      }
    }

    const data = await service.createData(growthData);
    if (data.imunisations !== null) {
      await Children.findByIdAndUpdate(growthData.childrens, {
        $inc: { amountImunisation: 1 },
      });
    }
    res.status(201).json({ message: "Created data successfully", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Handler to update a children growth record by ID
const updateGrowth = async (req, res) => {
  const {
    checkDate,
    groupFase,
    childrens,
    heightBody,
    weightBody,
    imunisations,
  } = req.body;
  const updateFields = {};

  try {
    if (checkDate) updateFields.checkDate = checkDate;
    if (groupFase) updateFields.groupFase = groupFase;
    if (heightBody) updateFields.heightBody = heightBody;
    if (weightBody) updateFields.weightBody = weightBody;

    if (childrens) {
      const existingChildren = await Children.findById(childrens);
      if (!existingChildren) {
        return res.status(404).json({ message: "Children not found" });
      }
      updateFields.childrens = childrens;
    }

    if (imunisations) {
      const existingImunisations = await Imunisations.findById(imunisations);
      if (!existingImunisations) {
        return res.status(404).json({ message: "Imunisations not found" });
      }
      updateFields.imunisations = imunisations;
    }

    // If imunisations is an empty string, set it to null and decrement amountImunisation
    if (imunisations === "") {
      updateFields.imunisations = null;

      // Find the existing record to get the current children reference
      const existingGrowth = await service.findById(req.params.id);
      if (existingGrowth && existingGrowth.imunisations) {
        await Children.findByIdAndUpdate(existingGrowth.childrens, {
          $inc: { amountImunisation: -1 },
        });
      }
    }

    const data = await service.updateData(req.params.id, updateFields);
    res.status(200).json({ message: "Data was updated", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Handler to delete a children growth record by ID
const deleteGrowth = async (req, res) => {
  try {
    const growth = await service.deleteData(req.params.id);
    return res.status(200).json({ message: "Data was deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getAllGrowth,
  getGrowthById,
  createGrowth,
  updateGrowth,
  deleteGrowth,
  getAllBaduta,
  getGrowthByChildren,
};
