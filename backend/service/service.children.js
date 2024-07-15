const Children = require("../models/model.children");

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
  createChildren,
  deleteChildren,
  getAllBaduta,
  getAllBalita,
};
