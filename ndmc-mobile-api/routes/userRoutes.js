const express = require("express");
const userController = require("../controllers/userController");
const roleMiddleware = require("../middlewares/roleMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const paginationMiddleware = require("../middlewares/paginationMiddleware");
const User = require("../models/User");

const userRouter = express.Router();

userRouter.post("/", userController.createUser);
userRouter.post("/login", userController.loginUser);
userRouter.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  paginationMiddleware(User),
  userController.getAll
);
userRouter.get("/:userId", userController.getUserById);
userRouter.delete(
  "/:userId",
  authMiddleware,
  roleMiddleware("admin"),
  userController.deleteUser
);

module.exports = userRouter;
