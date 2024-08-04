const mongoose = require("mongoose");

const schema = mongoose.model("birth", {
  dob: { type: Date, required: true },
  circumHead: { type: Number },
  heightBody: { type: Number },
  weightBody: { type: Number },
  children: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "children", // Reference to the Choice collection
  },
  createdAt: { type: Date, default: Date.now() },
  updateAt: { type: Date, default: Date.now() },
});

module.exports = schema;
