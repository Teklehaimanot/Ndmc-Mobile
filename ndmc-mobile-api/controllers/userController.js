const User = require("../models/User");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isValidEmail = require("../utility/validateEmail");
require("dotenv/config");

const createUser = async (req, res) => {
  let { name, email, role, password } = _.pick(req.body, [
    "name",
    "email",
    "role",
    "password",
  ]);

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: "all fileds are required" });
    }

    if (password && password.length < 7) {
      return res
        .status(400)
        .json({ error: "Min password length should be atleast 7" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    const getUserByEmail = await User.find({ email });
    if (getUserByEmail.length) {
      return res.status(400).json({ error: "A User exist by this email" });
    }
    const saltRound = 10;
    const passwordHash = await bcrypt.hash(password, saltRound);
    const user = await User.create({
      name: name,
      email: email,
      role: role,
      password: passwordHash,
    });
    console.log(user);
    const userData = _.pick(user, ["_id", "email", "role"]);
    const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET);
    res.header("x-auth", `Bearer ${accessToken}`).json({
      success: true,
      token: `Bearer ${accessToken}`,
      user: { _id: user._id, name, email, role: user.role },
    });
  } catch (err) {
    console.log({ error: err });
    res.status(400).json({ Error: err.message });
  }
};

const loginUser = async (req, res) => {
  let { email, password } = _.pick(req.body, ["email", "password"]);
  try {
    if (!password || !email) {
      return res
        .status(400)
        .json({ error: "Password and email are required!" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    const user = await User.find({ email });
    console.log(user);
    if (!user.length) {
      return res.status(400).json({ error: "User not found!" });
    }
    const isValid = await bcrypt.compare(password, user[0].password);

    if (!isValid) {
      return res
        .status(400)
        .json({ error: "Invalid detail please check password and username!" });
    }

    const userData = _.pick(user[0], ["_id", "email", "role"]);
    const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET);
    res.header("x-auth", `Bearer ${accessToken}`).json({
      success: true,
      token: `Bearer ${accessToken}`,
      role: user[0].role,
    });
  } catch (err) {
    console.log({ error: err });
    res.status(400).json({ Error: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    res.status(200).json(req.paginatedResults);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.userId }).select(
      "-password"
    );
    if (!user) {
      return res.status(400).json({ error: "user not found" });
    }
    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const find = await User.findById({ _id: req.params.userId });
    if (!find) {
      return res.status(404).json({ error: "dataset not found" });
    }
    const deltedUser = await User.deleteOne({ _id: req.params.userId });
    res.status(200).json({
      success: true,
      user: deltedUser,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
module.exports = {
  createUser,
  loginUser,
  getAll,
  getUserById,
  deleteUser,
};