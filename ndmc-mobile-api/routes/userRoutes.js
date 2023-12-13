const express = require("express");
const userController = require("../controllers/userController");
const roleMiddleware = require("../middlewares/roleMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

const userRouter = express.Router();

userRouter.post("/", userController.createUser);
userRouter.post("/login", userController.loginUser);
userRouter.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  userController.getAll
);
userRouter.get("/:userId", userController.getUserById);
userRouter.delete("/:userId", userController.deleteUser);

module.exports = userRouter;
