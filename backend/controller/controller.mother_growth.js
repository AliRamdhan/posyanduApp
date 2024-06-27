const service = require("../service/service.mothergrowth");
const Mother = require("../models/model.mother");

// Handler to get all growth records
const getAllGrowth = async (req, res) => {
  try {
    const data = await service.getAll();
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

module.exports = {
  getAllGrowth,
  getGrowthById,
  createGrowth,
  updateGrowth,
  deleteGrowth,
};
