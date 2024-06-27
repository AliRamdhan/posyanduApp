const service = require("../service/service.childrengrowth");
const Children = require("../models/model.children");
const Imunisations = require("../models/model.immunisation");

// Handler to get all children growth records
const getAllGrowth = async (req, res) => {
  try {
    const data = await service.getAll();
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
  const {
    checkDate,
    groupFase,
    childrens,
    heightBody,
    weightBody,
    imunisations,
  } = req.body;
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
    if (childrens) {
      const childrenExists = await Children.findById(childrens);
      if (!childrenExists) {
        return res.status(404).json({ message: "Children record not found" });
      }
    }

    // Check if the provided imunisations ID exists
    if (imunisations) {
      const imunisationsExists = await Imunisations.findById(imunisations);
      if (!imunisationsExists) {
        return res
          .status(404)
          .json({ message: "Imunisations record not found" });
      }
    }

    const data = await service.createData(growthData);
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
};
