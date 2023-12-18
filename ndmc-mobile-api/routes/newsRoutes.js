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
newsRouter.get("/", paginationMiddleware(News), newsController.getAllNews);
newsRouter.get("/:newsId", newsController.getNewsById);
newsRouter.post(
  "/createComment/:newsId",
  authMiddleware,
  newsController.createComment
);
newsRouter.patch("/:newsId", newsController.updateNews);
newsRouter.delete("/:newsId", newsController.deleteNewsById);

module.exports = newsRouter;
