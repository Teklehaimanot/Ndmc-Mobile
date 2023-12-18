const express = require("express");
const newsController = require("../controllers/newsController");

const newsRouter = express.Router();

newsRouter.post("/", newsController.createNews);

module.exports = newsRouter;
