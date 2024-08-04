const Growth = require("../models/model.mother.growth");
const Mother = require("../models/model.mother");

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

module.exports = {
  getAll,
  getAllMother,
  createData,
  getById,
  getMother,
  updateData,
  deleteData,
  getPregnant,
};
