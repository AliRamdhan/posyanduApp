const mongoose = require("mongoose");

const schema = mongoose.model("mother_growth", {
  checkDate: { type: Date, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  kbtype: { type: String },
  wombAge: { type: Number },
  numbChild: { type: Number },
  groupFase: {
    type: String,
    enum: ["Trimester 1", "Trimester 2", "Trimester 3", "None"],
  },
  circumStomach: { type: Number },
  circumHand: { type: Number },
  mother: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "mother", // Reference to the Choice collection
  },
});
module.exports = schema;
