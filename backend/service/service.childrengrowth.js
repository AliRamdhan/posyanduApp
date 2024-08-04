const ChildrenGrowth = require("../models/model.children.growth");
const Children = require("../models/model.children");

const getAll = async (req, res) => {
  try {
    const data = await ChildrenGrowth.find()
      .populate({
        path: "childrens",
        match: childrensMatch,
      })
      .populate("imunisations");
    return res.status(200).json({
      message: "List All Data",
      data,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Function to get all children growth records
const getAllGrowth = async (
  filter = {},
  sortOptions = {},
  skip = 0,
  limit = 10,
  childrensMatch = {}
) => {
  try {
    const totalDocuments = await ChildrenGrowth.countDocuments(filter);

    const findQuery = await ChildrenGrowth.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .populate({
        path: "childrens",
        match: childrensMatch,
      });

    const filteredData = findQuery.filter((doc) => doc.childrens);

    return { data: filteredData, total: totalDocuments };
  } catch (error) {
    throw error;
  }
};

const getBaduta = async () => {
  try {
    const data = await ChildrenGrowth.find({ isBaduta: true }).populate(
      "childrens imunisations"
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const getChild = async (childId) => {
  try {
    const existingChild = await Children.findOne({ _id: childId });
    if (!existingChild) {
      return null;
    }
    const data = await ChildrenGrowth.find({
      childrens: existingChild,
    }).populate("childrens imunisations");
    return data;
  } catch (error) {
    throw error;
  }
};

// Function to get a children growth record by ID
const getById = async (id) => {
  try {
    const data = await ChildrenGrowth.findById(id).populate(
      "childrens imunisations"
    );
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
  getAllGrowth,
  getBaduta,
  createData,
  getById,
  updateData,
  deleteData,
  getChild,
};
