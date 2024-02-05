const mongoose = require("mongoose");

const collabratorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const News = mongoose.model("Collaborator", collabratorSchema);

module.exports = News;
