const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  directorStatement: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  strategies: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  aboutUs: {
    type: String,
    required: true,
  },
  vision: {
    type: String,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
});

const AboutNdmc = mongoose.model("AboutNdmc", newsSchema);

module.exports = AboutNdmc;
