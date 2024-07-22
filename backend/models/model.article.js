const mongoose = require("mongoose");

const schema = mongoose.model("article", {
  title: {
    type: String,
    required: true,
  },
  images: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = schema;
