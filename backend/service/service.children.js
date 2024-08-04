const Children = require("../models/model.children");

const getAll = async (req, res) => {
  try {
    const children = await Children.find();
    return children;
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getAllBaduta = async () => {
  try {
    const children = await Children.find({ isBaduta: true });
    return children;
  } catch (error) {
    throw error;
  }
};

const getAllBalita = async () => {
  try {
    const children = await Children.find({ isBalita: true });
    return children;
  } catch (error) {
    throw error;
  }
};

const updateData = async (id, data) => {
  try {
    const child = await Children.findById(id);
    if (!child) {
      throw new Error("Children record not found");
    }
    await Children.updateOne({ _id: id }, data);
    return await Children.findById(id); // Returning the updated document
  } catch (error) {
    throw error;
  }
};

// Function to create a new children record
const createChildren = async (data) => {
  try {
    const children = new Children(data);
    await children.save();
    return children;
  } catch (error) {
    throw error;
  }
};

// Function to delete a children record by ID
const deleteChildren = async (id) => {
  try {
    const children = await Children.findById(id);
    if (!children) {
      throw new Error("Children record not found");
    }
    await Children.deleteOne({ _id: id });
    return { message: "Children record deleted successfully" };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAll,
  createChildren,
  updateData,
  deleteChildren,
  getAllBaduta,
  getAllBalita,
};
