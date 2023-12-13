const User = require("../models/User");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
      res.status(400).json({ error: "all fileds are required" });
    }

    if (password && password.length < 7) {
      res
        .status(400)
        .json({ error: "Min password length should be atleast 7" });
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
    console.log(accessToken);
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

module.exports = {
  createUser,
};
