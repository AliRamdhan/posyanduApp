const birthService = require("../service/service.birth");
const Children = require("../models/model.children");
const Mother = require("../models/model.mother");

// Handler to get all birth records
const getAllBirth = async (req, res) => {
  try {
    const data= await birthService.getAllBirth();
    res.status(200).json({ message: "List All Data", data});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Handler to get a birth record by ID
const getBirthById = async (req, res) => {
  try {
    const data = await birthService.getBirthById(req.params.id);
    res.status(200).json({message: "Details Data",data});
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
