const User = require("../../models/model.user");
const Mother = require("../../models/model.mother");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  numberHp: Joi.string().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("Admin", "User").default("User"),
  mother: Joi.string().optional(),
});

const register = async (userData) => {
  const { error, value } = userSchema.validate(userData);
  if (error) throw new Error(error.details[0].message);

  const { username, email, numberHp, password, role, mother } = value;
  const hashedPassword = await bcrypt.hash(password, 10);

  if (mother) {
    const motherExists = await Mother.findById(mother);
    if (!motherExists) throw new Error("Mother not found");
  }
  if (email) {
    const emailExists = await User.findOne({email});
    if (emailExists) throw new Error("Email was already taken");
  }
  if (numberHp) {
    const numberHpExists = await User.findOne({numberHp});
    if (numberHpExists) throw new Error("HP was already taken");
  }
  
  const newUser = new User({
    username: username,
    email: email,
    numberHp: numberHp,
    password: hashedPassword,
    role: role,
    mother: mother,
  });

  return newUser.save();
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Invalid password");

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
      numberHp: user.numberHp,
      role: user.role,
    },
    `${process.env.JWT_SECRET}`,
    {
      expiresIn: "1h",
    }
  );

  return { token, user };
};

const getUserById = (id) => {
  return User.findById(id).populate("mother");
};

module.exports = {
  register,
  login,
  getUserById,
};
