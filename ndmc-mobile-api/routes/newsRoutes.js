const express = require("express");
const newsController = require("../controllers/newsController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const paginationMiddleware = require("../middlewares/paginationMiddleware");
const News = require("../models/News");

const newsRouter = express.Router();

newsRouter.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  newsController.createNews
);
newsRouter.get("/", paginationMiddleware(News), newsController.getAll);
newsRouter.post(
  "/createComment/:newsId",
  authMiddleware,
  newsController.createComment
);

module.exports = newsRouter;
