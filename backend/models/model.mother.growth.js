const mongoose = require("mongoose");

const schema = mongoose.model("mother_growth", {
  checkDate: { type: Date, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  kbtype: { type: String },
  pregnantStatus: { type: String },
  wombAge: { type: Number },
  numbChild: { type: Number },
  groupFase: {
    type: String,
    enum: ["0-1", "1-3", "3-6", "6-9", "9-12", "12-18", "18-24"],
    required: true,
  },
  circumStomach: { type: Number },
  circumHand: { type: Number },
  mother: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "mother", // Reference to the Choice collection
  },
});
module.exports = schema;
