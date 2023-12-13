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
    if (!name || !email || !role || !password) {
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
    const userData = _.pick(user, ["_id", "email"]);
    const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET);
    res.header("x-auth", `Bearer ${accessToken}`).json({
      success: true,
      token: `Bearer ${accessToken}`,
      user: { name, email, role },
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
        .json({ error: "Password and username are required!" });
    }
    const user = await User.find({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found!" });
    }
    console.log(user, password);
    const isValid = await bcrypt.compare(password, user[0].password);

    if (!isValid) {
      return res
        .status(400)
        .json({ error: "Invalid detail please check password and username!" });
    }

    const userData = _.pick(user[0], ["_id", "username", "name"]);
    const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET);
    res.header("x-auth", `Bearer ${accessToken}`).json({
      success: true,
      token: `Bearer ${accessToken}`,
      role: user[0].role,
    });
  } catch (err) {
    console.log({ error: err });
    res.status(400).json({ Error: "Some error" });
  }
};

module.exports = {
  createUser,
  loginUser,
};
