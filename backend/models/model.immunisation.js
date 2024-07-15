const mongoose = require("mongoose");

const schema = mongoose.model("imunisations", {
  name: {
    type: String,
    required: true,
  },
  groupAge: {
    type: Number,
    required: true,
  },
  descriptionPrevented: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now() },
  updateAt: { type: Date, default: Date.now() },
});

module.exports = schema;
