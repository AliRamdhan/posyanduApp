const mongoose = require("mongoose");

const schema = mongoose.model("children_growth", {
  checkDate: { type: Date, required: true },
  groupFase: {
    type: String,
    enum: ["0-1", "1-3", "3-6", "6-9", "9-12", "12-18", "18-24"],
    required: true,
  },
  childrens: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "children", // Reference to the Choice collection
  },
  //   object_id_IBU: { type: String },
  //   tgl_kelahiran: { type: Date, required: true },
  //   jenis_kelamin: { type: String, enum: ["Male", "Female"], required: true },
  //   lingkar_kepala: { type: String },
  //   berat_badan: { type: Number },
  //   tinggi_badan: { type: Number },
  //   по_КК: { type: String },
});

module.export = schema;

/**
 * Bayi Baru Lahir (0-1 bulan)
Bayi Usia 1-3 bulan
Bayi Usia 3-6 bulan
Bayi Usia 6-9 bulan
Bayi Usia 9-12 bulan
Bayi Usia 12-18 bulan
Bayi Usia 18-24 bulan
 */
