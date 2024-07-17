const UserService = require("../service/service.user");

const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUser();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
  getAllUsers,
  getByIdUser,
  updateUser,
  deleteUser,
};
