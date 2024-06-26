const mongoose = require("mongoose");

const userSchema = mongoose.model("user", {
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  numberHp: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["Admin", "User"],
    default: "User",
    required: true,
  },
  mother: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "mother", // Reference to the Choice collection
  },
});

module.exports = userSchema;
