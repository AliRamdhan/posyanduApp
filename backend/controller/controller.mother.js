const Mother = require("../models/model.mother");

// const GetAllData = async (req, res) => {
//   try {
//     const data = await Mother.find();
//     return res.status(200).json({
//       message: "List All Data",
//       data,
//     });
//   } catch (error) {
//     return res.status(400).json({ error: error.message });
//   }
// };
// const GetAllData = async (req, res) => {
//   try {
//     const {
//       name,
//       husband,
//       dob,
//       KS,
//       bpjs,
//       sortField,
//       sortOrder = "asc",
//       page = 1,
//       limit = 10,
//     } = req.query;

//     const filter = {};
//     if (name) filter.name = name;
//     if (husband) filter.husband = husband;
//     if (dob) filter.dob = new Date(dob);
//     if (KS) filter.KS = KS;
//     if (bpjs !== undefined) filter.bpjs = bpjs === "true";

//     const sortOptions = {};
//     if (sortField) sortOptions[sortField] = sortOrder === "desc" ? -1 : 1;

//     const data = await Mother.find(filter)
//       .sort(sortOptions)
//       .skip((page - 1) * limit)
//       .limit(parseInt(limit));

//     return res.status(200).json({
//       message: "List All Data",
//       data,
//       pagination: {
//         page,
//         limit,
//         total: await Mother.countDocuments(filter),
//       },
//     });
//   } catch (error) {
//     return res.status(400).json({ error: error.message });
//   }
// };
const GetAllData = async (req, res) => {
  try {
    const {
      name,
      husband,
      dob,
      KS,
      bpjs,
      sortField,
      sortOrder = "asc",
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};
    if (name) {
      // Case insensitive search with partial matching
      filter.name = { $regex: new RegExp("^" + name, "i") };
    }
    if (husband) filter.husband = { $regex: new RegExp("^" + husband, "i") };
    if (dob) filter.dob = new Date(dob);
    if (KS) filter.KS = KS;
    if (bpjs !== undefined) filter.bpjs = bpjs === "true";

    const sortOptions = {};
    if (sortField) sortOptions[sortField] = sortOrder === "desc" ? -1 : 1;

    const countDocumentsPromise = Mother.countDocuments(filter);
    const findQuery = Mother.find(filter)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const [data, total] = await Promise.all([findQuery, countDocumentsPromise]);

    return res.status(200).json({
      message: "List All Data",
      data,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
      },
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const GetDataById = async (req, res) => {
  try {
    const data = await Mother.findOne({ _id: req.params.id });
    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }
    return res.status(200).json({ message: "Details Data", data });
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

    const existingMother = await Mother.findOne({ _id: req.params.id });
    if (!existingMother) {
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
    const data = await Mother.deleteOne({ _id: req.params.id });
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
