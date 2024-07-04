const mongoose = require("mongoose");

const schema = mongoose.model("imunisations", {
  name: {
    type: String,
  },
  groupAge: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now() },
  updateAt: { type: Date, default: Date.now() },
});

module.exports = schema;
