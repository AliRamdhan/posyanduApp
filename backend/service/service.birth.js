const Birth = require("../models/model.birth");

// Function to get all birth records
const getAllBirth = async () => {
  try {
    const birth = await Birth.find().populate("children").populate("mother");
    return birth;
  } catch (error) {
    throw error;
  }
};

// Function to get a birth record by ID
const getBirthById = async (id) => {
  try {
    const birth = await Birth.findById(id)
      .populate("children")
      .populate("mother");
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
  getAllBirth,
  createBirth,
  getBirthById,
  updateBirth,
  deleteBirth,
};
