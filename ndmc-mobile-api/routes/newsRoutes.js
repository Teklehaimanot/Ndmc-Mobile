const express = require("express");
const newsController = require("../controllers/newsController");
const authMiddleware = require("../middlewares/authMiddleware");

const newsRouter = express.Router();

newsRouter.post("/", newsController.createNews);
newsRouter.post(
  "/createComment/:newsId",
  authMiddleware,
  newsController.createComment
);

module.exports = newsRouter;
