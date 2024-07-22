const mongoose = require("mongoose");

const schema = mongoose.model("children_growth", {
  checkDate: { type: Date, required: true },
  groupFase: {
    type: String,
    enum: ["Baduta", "Balita"],
    required: true,
  },
  childrens: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "children", // Reference to the Choice collection
  },
  heightBody: { type: Number },
  weightBody: { type: Number },
  imunisations: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "imunisations", // Reference to the Choice collection
    default: null,
  },
});

module.exports = schema;

/**
 * Bayi Baru Lahir (0-1 bulan)
Bayi Usia 1-3 bulan
Bayi Usia 3-6 bulan
Bayi Usia 6-9 bulan
Bayi Usia 9-12 bulan
Bayi Usia 12-18 bulan
Bayi Usia 18-24 bulan
 */
