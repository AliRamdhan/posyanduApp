const Children = require("../models/model.children");
const Mother = require("../models/model.mother");
const GetAllData = async (req, res) => {
  try {
    const data = await Children.find().populate("mother");
    return res.status(200).json({
      message: "List All Data",
      data,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const GetDataById = async (req, res) => {
  try {
    const data = await Children.findOne({ _id: req.params.id });
    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }
    return res.status(200).json({ message: "Details Data", data });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const CreateData = async (req, res) => {
  const { name, nik, gender, dob, amountImunisation, mother } = req.body;
  try {
    const existingMother = await Mother.findOne({ _id: mother });
    if (!existingMother) {
      return res.status(404).json({ message: "Data not found" });
    }
    const data = await new Children({
      name: name,
      nik: nik,
      gender: gender,
      dob: dob,
      amountImunisation: amountImunisation,
      mother: existingMother,
    }).save();
    return res.status(200).json({ message: "Success create data", data });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const UpdateData = async (req, res) => {
  const { name, nik, gender, dob, amountImunisation, mother } = req.body;
  const updateFields = {};
  try {
    if (name) {
      updateFields.name = name;
    }
    if (nik) {
      updateFields.nik = nik;
    }
    if (dob) {
      updateFields.dob = dob;
    }
    if (gender) {
      updateFields.gender = gender;
    }
    if (amountImunisation) {
      updateFields.amountImunisation = amountImunisation;
    }
    if (mother) {
      updateFields.mother = mother;
    }

    if (mother) {
      const existingMother = await Mother.findOne({ _id: mother });
      if (!existingMother) {
        return res.status(404).json({ message: "Mother not found" });
      }
    }

    const existingChildren = await Children.findOne({ _id: req.params.id });
    if (!existingChildren) {
      return res.status(404).json({ message: "Data not found" });
    }

    const data = await Children.updateOne({ _id: req.params.id }, updateFields);
    return res.status(200).json({ message: "Data was updated", data });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const DeleteData = async (req, res) => {
  try {
    const data = await Children.deleteOne({ _id: req.params.id });
    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }
    return res.status(200).json({ message: "Data was deleted" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  GetAllData,
  CreateData,
  GetDataById,
  UpdateData,
  DeleteData,
};
