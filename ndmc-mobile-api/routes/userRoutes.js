const express = require("express");
const userController = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.json({
    userRouter: "it is working",
  });
});

/*
// @params none
// body email, password, name
// method post
//auth none
//signup user
*/
userRouter.post("/", userController.createUser);
userRouter.post("/login", userController.loginUser);

module.exports = userRouter;
