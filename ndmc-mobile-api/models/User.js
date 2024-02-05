const mongoose = require("mongoose");

const UserSchema = {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  profileImage: {
    type: String,
  },
  bio: {
    type: String,
  },
};

module.exports = mongoose.model("users", UserSchema);
