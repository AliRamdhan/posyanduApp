const ChildrenGrowth = require('../models/model.children.growth');

// Function to get all children growth records
const getAll = async () => {
  try {
    const data = await ChildrenGrowth.find().populate("childrens imunisations");
    return data;
  } catch (error) {
    throw error;
  }
};

// Function to get a children growth record by ID
const getById = async (id) => {
  try {
    const data = await ChildrenGrowth.findById(id).populate("childrens imunisations");
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

module.exports = {
  getAll,
  createData,
  getById,
  updateData,
  deleteData
};
