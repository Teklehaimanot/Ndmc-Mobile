const User = require("../models/User");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isValidEmail = require("../utility/validateEmail");
require("dotenv/config");

const createUser = async (req, res) => {
  let { name, email, password, confirmPassword } = _.pick(req.body, [
    "name",
    "email",
    "role",
    "password",
    "confirmPassword",
  ]);

  try {
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "all fileds are required" });
    }

    if (password && password.length < 7) {
      return res
        .status(400)
        .json({ error: "Min password length should be atleast 7" });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "Passwords do not match. Please check and try again" });
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
      role: "user",
      password: passwordHash,
      active: true,
    });
    const userData = _.pick(user, ["_id", "email", "role"]);
    const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET);
    res.header("x-auth", `Bearer ${accessToken}`).json({
      success: true,
      token: `Bearer ${accessToken}`,
      user: {
        id: user._id,
        name,
        email,
        role: user.role,
        active: user.active,
      },
    });
  } catch (err) {
    console.log({ error: err });
    res.status(500).json({ Error: "Internal Server Error" });
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
    if (!user.length) {
      return res.status(400).json({ error: "User not found!" });
    }
    const isValid = await bcrypt.compare(password, user[0].password);

    if (!isValid) {
      return res
        .status(400)
        .json({ error: "Invalid detail please check password and username!" });
    }
    user[0].active = true;
    const updatedUser = await user[0].save();
    const userData = _.pick(user[0], ["_id", "email", "role"]);
    const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET);
    res.header("x-auth", `Bearer ${accessToken}`).json({
      success: true,
      token: `Bearer ${accessToken}`,
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        active: updatedUser.active,
      },
    });
  } catch (err) {
    console.log({ error: err });
    res.status(500).json({ Error: "Internal Server Error" });
  }
};

const logoutUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.userId }).select(
      "-password"
    );
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    user.active = false;
    const updatedUser = await user.save();
    res.status(201).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  const { name, email, password, role, confirmPassword } = req.body;
  try {
    if (!name || !email || !password || !role || !confirmPassword) {
      return res.status(400).json({ error: "all fileds are required" });
    }
    if (password && password.length < 7) {
      return res
        .status(400)
        .json({ error: "Min password length should be atleast 7" });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "Passwords do not match. Please check and try again" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    const user = await User.findById({ _id: req.params.userId });
    const saltRound = 10;
    const passwordHash = await bcrypt.hash(password, saltRound);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    (user.name = name),
      (user.email = email),
      (user.password = passwordHash),
      (user.role = role);
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    res.status(200).json(req.paginatedResults);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.userId }).select(
      "-password"
    );
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const searchUserByName = async (req, res) => {
  try {
    const { name } = req.params;
    const regex = new RegExp(name, "i");
    const users = await User.find({ name: regex });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const find = await User.findById({ _id: req.params.userId });
    if (!find) {
      return res.status(404).json({ error: "dataset not found" });
    }
    const deltedUser = await User.deleteOne({ _id: req.params.userId });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = {
  createUser,
  loginUser,
  getAll,
  getUserById,
  deleteUser,
  logoutUser,
  updateUser,
  searchUserByName,
};
