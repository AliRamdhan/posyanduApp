const AuthService = require("../../service/auth/service.auth");

const register = async (req, res) => {
  const { username, email, numberHp, password, role, mother } = req.body;
  const userData = {
    username,
    email,
    numberHp,
    password,
    role,
    mother,
  };
  try {
    const user = await AuthService.register(userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await AuthService.login(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await AuthService.getUserById(req.params.id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  getUser,
};
