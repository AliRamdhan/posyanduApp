const UserService = require("../service/service.user");

const getAll = async (req, res) => {
  try {
    const users = await UserService.getAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const {
      email,
      motherName,
      sortField,
      sortOrder = "asc",
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};
    if (email) {
      filter.email = { $regex: new RegExp("^" + email, "i") };
    }

    const sortOptions = {};
    if (sortField) sortOptions[sortField] = sortOrder === "desc" ? -1 : 1;

    const skip = (page - 1) * limit;
    const limitNumber = parseInt(limit);
    const motherMatch = motherName
      ? { name: { $regex: new RegExp("^" + motherName, "i") } }
      : {};
    const { data, total } = await UserService.getAllUser(
      filter,
      sortOptions,
      skip,
      limitNumber,
      motherMatch
    );

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

const getByIdUser = async (req, res) => {
  try {
    const data = await UserService.getByIdUser(req.params.id);
    res.status(200).json({ message: "Details Data", data });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const { username, email, numberHp, password, role, mother } = req.body;
  const updatedFields = {};
  try {
    if (username) updatedFields.username = username;
    if (email) updatedFields.email = email;
    if (numberHp) updatedFields.numberHp = numberHp;
    if (password) updatedFields.password = password;
    if (mother) updatedFields.mother = mother;
    const updatedUser = await UserService.updateUser(
      req.params.id,
      updatedFields
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await UserService.deleteUser(req.params.id);
    res.status(200).json({ message: "User record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  getAllUser,
  getByIdUser,
  updateUser,
  deleteUser,
};
