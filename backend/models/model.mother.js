const mongoose = require("mongoose");

const schema = mongoose.model("mother", {
  name: { type: String, required: true },
  nik: { type: String, required: true },
  kk: { type: String, required: true },
  husband: { type: String },
  husbandnik: { type: String },
  dob: { type: Date, required: true },
  bpjs: { type: Boolean },
  KS: { type: String, enum: ["KS1", "KS2", "KS3"], required: true },
  RT: { type: Number },
  RW: { type: Number },
  amountChild: { type: Number },
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
