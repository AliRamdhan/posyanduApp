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
  isPregnant: { type: Boolean, required: true, default: false },
  isBreastfeed: { type: Boolean, required: true, default: false },
  amountChild: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now() },
  updateAt: { type: Date, default: Date.now() },
});
// anak , auto update jmlh anak

module.exports = schema;

/**
 *
 * id	STRING
 * NIK	STRING
 * nama	STRING
 * object_id_ANAK	STRING
 * tgl_kelahiran	DATE
 * jenis_kelamin	STRING
 * suami	STRING
 * NIK_suami	STRING
 * BPJS	BOOLEAN
 * jmlanak	NUMBER
 * KS	STRING
 * RT	NUMBER
 **/
