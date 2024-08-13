const mongoose = require("mongoose");

const schema = mongoose.model("mother", {
  name: { type: String, required: true },
  nik: { type: String, required: true },
  kk: { type: String, required: true },
  husband: { type: String },
  husbandnik: { type: String },
  dob: { type: Date, required: true },
  bpjs: { type: Boolean },
  ks: { type: String, enum: ["KS1", "KS2", "KS3"], required: true },
  rt: { type: Number },
  rw: { type: Number },
  isPregnant: { type: Boolean, default: false },
  amountChild: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now() },
  updateAt: { type: Date, default: Date.now() },
});

module.exports = schema;
