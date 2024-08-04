const User = require("../models/model.user");
const Mother = require("../models/model.mother");

const getAll = async () => {
  try {
    const users = await User.find().populate("mother");
    return users;
  } catch (error) {
    throw error;
  }
};
const getAllUser = async (
  filter = {},
  sortOptions = {},
  skip = 0,
  limit = 10,
  populateMatch = {}
) => {
  try {
    const totalDocuments = await User.countDocuments(filter);

    const findQuery = await User.find(filter)
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

const getByIdUser = async (id) => {
  try {
    const user = await User.findById(id).populate("mother");
    if (!user) {
      throw new Error("User record not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

// Function to create a new user record
const createUser = async (userData) => {
  try {
    if (userData.mother) {
      const motherExists = await Mother.findById(userData.mother);
      if (!motherExists) {
        throw new Error("Mother record not found");
      }
    }

    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (id, userData) => {
  try {
    if (userData.mother) {
      const motherExists = await Mother.findById(userData.mother);
      if (!motherExists) {
        throw new Error("Mother record not found");
      }
    }

    const user = await User.findById(id);
    if (!user) {
      throw new Error("User record not found");
    }

    await User.updateOne({ _id: id }, userData);
    return await User.findById(id); // Returning the updated document
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User record not found");
    }
    await User.deleteOne({ _id: id });
    return { message: "User record deleted successfully" };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAll,
  getAllUser,
  getByIdUser,
  createUser,
  updateUser,
  deleteUser,
};
