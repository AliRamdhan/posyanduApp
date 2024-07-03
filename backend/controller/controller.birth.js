const birthService = require("../service/service.birth");
const Children = require("../models/model.children");
const Mother = require("../models/model.mother");

// const GetAllData = async (req, res) => {
//   try {
//     const {
//       name,
//       husband,
//       dob,
//       ks,
//       bpjs,
//       sortField,
//       sortOrder = "asc",
//       page = 1,
//       limit = 10,
//     } = req.query;

//     const filter = {};
//     if (name) {
//       // Case insensitive search with partial matching
//       filter.name = { $regex: new RegExp("^" + name, "i") };
//     }
//     if (husband) filter.husband = { $regex: new RegExp("^" + husband, "i") };
//     if (dob) filter.dob = new Date(dob);
//     if (ks) filter.ks = ks;
//     if (bpjs !== undefined) filter.bpjs = bpjs === "true";

//     const sortOptions = {};
//     if (sortField) sortOptions[sortField] = sortOrder === "desc" ? -1 : 1;

//     const countDocumentsPromise = Mother.countDocuments(filter);
//     const findQuery = Mother.find(filter)
//       .sort(sortOptions)
//       .skip((page - 1) * limit)
//       .limit(parseInt(limit));

//     const [data, total] = await Promise.all([findQuery, countDocumentsPromise]);

//     return res.status(200).json({
//       message: "List All Data",
//       data,
//       pagination: {
//         page: parseInt(page),
//         limit: parseInt(limit),
//         total,
//       },
//     });
//   } catch (error) {
//     return res.status(400).json({ error: error.message });
//   }
// };

const getAllBirth = async (req, res) => {
  try {
    const {
      dob,
      circumHead,
      heightBody,
      weightBody,
      sortField,
      sortOrder = "asc",
      page = 1,
      limit = 10,
    } = req.query;

    // Build the filter object based on the query parameters
    const filter = {};
    if (dob) filter.dob = new Date(dob);
    if (circumHead) filter.circumHead = circumHead;
    if (heightBody) filter.heightBody = heightBody;
    if (weightBody) filter.weightBody = weightBody;

    // Build the sort options
    const sortOptions = {};
    if (sortField) sortOptions[sortField] = sortOrder === "desc" ? -1 : 1;

    // Calculate pagination options
    const skip = (page - 1) * limit;
    const limitNumber = parseInt(limit);

    const { data, total } = await birthService.getAllBirth(
      filter,
      sortOptions,
      skip,
      limitNumber
    );

    // Respond with the data and pagination info
    res.status(200).json({
      message: "List All Data",
      data,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Handler to get a birth record by ID
const getBirthById = async (req, res) => {
  try {
    const data = await birthService.getBirthById(req.params.id);
    res.status(200).json({ message: "Details Data", data });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Handler to create a new birth record
const createBirth = async (req, res) => {
  const { dob, circumHead, heightBody, weightBody, children, mother } =
    req.body;
  const birthData = {
    dob,
    circumHead,
    heightBody,
    weightBody,
    children,
    mother,
  };
  try {
    // Check if the provided children ID exists
    if (children) {
      const childrenExists = await Children.findById(children);
      if (!childrenExists) {
        return res.status(404).json({ message: "Children record not found" });
      }
    }

    // Check if the provided mother ID exists
    if (mother) {
      const motherExists = await Mother.findById(mother);
      if (!motherExists) {
        return res.status(404).json({ message: "Mother record not found" });
      }
    }

    const data = await birthService.createBirth(birthData);
    res.status(201).json({ message: "Created data successfully", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Handler to update a birth record by ID
const updateBirth = async (req, res) => {
  const { dob, circumHead, heightBody, weightBody, children, mother } =
    req.body;
  const updateFields = {};

  try {
    if (dob) updateFields.dob = dob;
    if (circumHead) updateFields.circumHead = circumHead;
    if (heightBody) updateFields.heightBody = heightBody;
    if (weightBody) updateFields.weightBody = weightBody;

    if (children) {
      const existingChildren = await Children.findById(children);
      if (!existingChildren) {
        return res.status(404).json({ message: "Children not found" });
      }
      updateFields.children = children;
    }

    if (mother) {
      const existingMother = await Mother.findById(mother);
      if (!existingMother) {
        return res.status(404).json({ message: "Mother not found" });
      }
      updateFields.mother = mother;
    }

    const data = await birthService.updateBirth(req.params.id, updateFields);
    res.status(200).json({ message: "Data was updated", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Handler to delete a birth record by ID
const deleteBirth = async (req, res) => {
  try {
    const birth = await birthService.deleteBirth(req.params.id);
    return res.status(200).json({ message: "Data was deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getAllBirth,
  getBirthById,
  createBirth,
  updateBirth,
  deleteBirth,
};
