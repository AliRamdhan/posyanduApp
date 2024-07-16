// const mongoose = require("mongoose");

// const schema = mongoose.model("children", {
// name: { type: String, required: true },
// nik: { type: String },
// gender: { type: String, enum: ["Male", "Female"], required: true },
// dob: { type: Date, required: true },
// amountImunisation: { type: Number, default: 0 },
// mother: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "mother", // Reference to the Choice collection
// },
//   //   object_id_IBU: { type: String },
//   //   tgl_kelahiran: { type: Date, required: true },
//   //   jenis_kelamin: { type: String, enum: ["Male", "Female"], required: true },
//   //   lingkar_kepala: { type: String },
//   //   berat_badan: { type: Number },
//   //   tinggi_badan: { type: Number },
//   //   по_КК: { type: String },

//   // imnisasi anak itu many to many
// });

// module.export = schema;

const mongoose = require("mongoose");

const schema = mongoose.model("children", {
  name: { type: String, required: true },
  nik: { type: String },
  gender: { type: String, enum: ["Male", "Female"], required: true },
  dob: { type: Date, required: true },
  amountImunisation: { type: Number, default: 0 },
  isBaduta: { type: Boolean, required: true, default: true },
  isBalita: { type: Boolean, required: true, default: false },
  mother: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "mother", // Reference to the Choice collection
  },
  createdAt: { type: Date, default: Date.now() },
  updateAt: { type: Date, default: Date.now() },
});

module.exports = schema;
