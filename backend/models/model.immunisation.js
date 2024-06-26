const mongoose = require("mongoose");

const schema = mongoose.model("imunisations", {
  name: {
    type: String,
  },
  groupAge: {
    type: String,
  },
});

module.exports = schema;
