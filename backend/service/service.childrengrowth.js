const ChildrenGrowth = require("../models/model.children.growth");
const Children = require("../models/model.children");
// Function to get all children growth records
const getAll = async (
  filter = {},
  sortOptions = {},
  skip = 0,
  limit = 10,
  childrensMatch = {}
) => {
  try {
    const findQuery = await ChildrenGrowth.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .populate({
        path: "childrens",
        match: childrensMatch, // Use match option for filtering based on populated field's properties
      })
      .populate("imunisations");

    // Filter out documents where childrens do not match
    const filteredData = findQuery.filter((doc) => doc.childrens);

    // const countDocumentsPromise = await ChildrenGrowth.countDocuments(filter);
    // Count only documents where childrens match
    const countDocumentsPromise = await ChildrenGrowth.countDocuments({
      ...filter,
      childrens: { $in: filteredData.map((doc) => doc.childrens._id) },
    });
    const [data, total] = await Promise.all([
      filteredData,
      countDocumentsPromise,
    ]);
    return { data: filteredData, total };
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
    console.log(existingChild);
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
  getBaduta,
  createData,
  getById,
  updateData,
  deleteData,
  getChild,
};
