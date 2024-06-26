const Mother = require("../models/model.mother");

const GetAllData = async (req, res) => {
  try {
    const response = await Mother.find();
    return res.status(200).json({
      message: "List All Data",
      response,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const GetDataById = async (req, res) => {
  try {
    const response = await Mother.findOne({ _id: req.params.id });
    if (!response) {
      return res.status(404).json({message: "Data not found"});
    }
    return res.status(200).json({ message: "Details Data", response });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const CreateData = async (req, res) => {
  const {
    name,
    nik,
    kk,
    husband,
    husbandnik,
    dob,
    bpjs,
    KS,
    RT,
    RW,
    amountChild,
  } = req.body;
  try {
    const data = await new Mother({
      name: name,
      nik: nik,
      kk: kk,
      husband: husband,
      husbandnik: husbandnik,
      dob: dob,
      bpjs: bpjs,
      KS: KS,
      RT: RT,
      RW: RW,
      amountChild: amountChild,
    }).save();
    return res.status(201).json({ message: "Success create data", data });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const UpdateData = async (req, res) => {
  const {
    name,
    nik,
    kk,
    husband,
    husbandnik,
    dob,
    bpjs,
    KS,
    RT,
    RW,
    amountChild,
  } = req.body;
  const updateFields = {};
  try {
    if (name) {
      updateFields.name = name;
    }
    if (nik) {
      updateFields.nik = nik;
    }
    if (kk) {
      updateFields.kk = kk;
    }
    if (husband) {
      updateFields.husband = husband;
    }
    if (husbandnik) {
      updateFields.husbandnik = husbandnik;
    }
    if (dob) {
      updateFields.dob = dob;
    }
    if (bpjs) {
      updateFields.bpjs = bpjs;
    }
    if (KS) {
      updateFields.KS = KS;
    }
    if (RT) {
      updateFields.RT = RT;
    }
    if (RW) {
      updateFields.RW = RW;
    }
    if (amountChild) {
      updateFields.amountChild = amountChild;
    }

    const response = await Mother.findOne({ _id: req.params.id });
    if (!response) {
      return res.status(404).json({ message: "Data not found" });
    }

    const data = await Mother.updateOne({ _id: req.params.id }, updateFields);
    return res.status(200).json({ message: "Data was updated", data });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const DeleteData = async (req, res) => {
  try {
    const response = await Mother.deleteOne({ _id: req.params.id });
    if (!response) {
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
