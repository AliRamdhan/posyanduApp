const birthService = require("../service/service.birth");
const childService = require("../service/service.children");
const Children = require("../models/model.children");
const Mother = require("../models/model.mother");

const getAll = async (req, res) => {
  try {
    const data = await birthService.getAll();
    return res.status(200).json({
      message: "List All Data",
      data,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

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

    if (circumHead) filter.circumHead = parseFloat(circumHead);
    if (heightBody) filter.heightBody = parseFloat(heightBody);
    if (weightBody) filter.weightBody = parseFloat(weightBody);

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

const createBirth = async (req, res) => {
  const {
    name,
    nik,
    gender,
    amountImunisation,
    dob,
    circumHead,
    heightBody,
    weightBody,
    mother,
  } = req.body;
  const childData = {
    name,
    nik,
    gender,
    dob,
    amountImunisation,
    mother,
  };
  let children;
  try {
    // Check if the provided mother ID exists
    if (mother) {
      const motherExists = await Mother.findById(mother);
      if (!motherExists) {
        return res.status(404).json({ message: "Mother record not found" });
      }
    }

    children = await childService.createChildren(childData);

    // Check if the provided children ID exists
    if (children) {
      const childrenExists = await Children.findById(children._id);
      if (!childrenExists) {
        return res.status(404).json({ message: "Children record not found" });
      }
      const birthData = {
        dob,
        circumHead,
        heightBody,
        weightBody,
        children: childrenExists,
      };
      const birth = await birthService.createBirth(birthData);
      const data = {
        children,
        birth,
      };
      await Mother.findByIdAndUpdate(mother, {
        $inc: { amountChild: 1 },
        $set: { isPregnant: false },
      });
      res.status(201).json({ message: "Created data successfully", data });
    } else {
      return res.status(404).json({ message: "Children record failed found" });
    }
  } catch (error) {
    if (children) {
      try {
        await childService.deleteChildren(children._id);
        await Mother.findByIdAndUpdate(mother, { $inc: { amountChild: -1 } });
      } catch (rollbackError) {
        return res
          .status(500)
          .json({ message: `Rollback failed: ${rollbackError.message}` });
      }
    }
    res.status(500).json({ message: error.message });
  }
};

const updateBirth = async (req, res) => {
  const {
    name,
    nik,
    gender,
    amountImunisation,
    dob,
    circumHead,
    heightBody,
    weightBody,
    mother,
    children,
  } = req.body;

  const updateChildFields = {};
  const updateBirthFields = {};

  try {
    // Fetch the current birth record
    const birth = await birthService.getBirthById(req.params.id);
    if (!birth) {
      return res.status(404).json({ message: "Birth record not found" });
    }

    // Fetch the current child record
    const currentChild = birth.children;
    if (!currentChild) {
      return res.status(404).json({ message: "Child not found" });
    }

    // Fetch the current mother record
    const currentMother = currentChild.mother;

    // Validate and update mother
    if (mother) {
      const newMotherExists = await Mother.findById(mother);
      if (!newMotherExists) {
        return res.status(404).json({ message: "New mother not found" });
      }
    }

    // Update child fields
    if (name) updateChildFields.name = name;
    if (nik) updateChildFields.nik = nik;
    if (gender) updateChildFields.gender = gender;
    if (amountImunisation)
      updateChildFields.amountImunisation = amountImunisation;
    if (mother) updateChildFields.mother = mother;

    // Update birth fields
    if (dob) updateBirthFields.dob = dob;
    if (circumHead) updateBirthFields.circumHead = circumHead;
    if (heightBody) updateBirthFields.heightBody = heightBody;
    if (weightBody) updateBirthFields.weightBody = weightBody;
    if (children) updateBirthFields.children = children;

    // Update the child record
    const updatedChild = await childService.updateData(
      currentChild._id,
      updateChildFields
    );
    if (!updatedChild) {
      return res.status(404).json({ message: "Child not found" });
    }

    // Update the birth record
    const updatedBirth = await birthService.updateBirth(
      req.params.id,
      updateBirthFields
    );
    if (!updatedBirth) {
      return res.status(404).json({ message: "Birth record not found" });
    }

    // Handle mother updates
    if (mother && mother.toString() !== currentMother.toString()) {
      await Mother.findByIdAndUpdate(currentMother, {
        $inc: { amountChild: -1 },
      });
      await Mother.findByIdAndUpdate(mother, { $inc: { amountChild: 1 } });
    }

    res.status(200).json({
      message: "Data was updated successfully",
      data: { updatedChild, updatedBirth },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBirth = async (req, res) => {
  try {
    const birth = await birthService.getBirthById(req.params.id);
    if (!birth) {
      return res.status(404).json({ message: "Birth record not found" });
    }

    const motherId = birth.children?.mother;
    if (motherId) {
      await Mother.findByIdAndUpdate(motherId, { $inc: { amountChild: -1 } });
    }

    await birthService.deleteBirth(req.params.id);
    res.status(200).json({ message: "Birth record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const exportDataExcel = async (req, res) => {
  try {
    const { month } = req.query;
    if (!month) {
      return res.status(400).json({ error: "Month is required" });
    }

    const [year, monthIndex] = month.split("-").map(Number);

    const wb = await birthService.exportDataToExcel(year, monthIndex);

    const fileName = `Laporan Data Kelahiran tahun ${year} bulan ${monthIndex}.xlsx`;

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

    wb.write(fileName, res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllBirth,
  getBirthById,
  createBirth,
  updateBirth,
  deleteBirth,
  exportDataExcel,
};
