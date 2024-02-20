const express = require("express");
const pubMedConroller = require("../controllers/pubMed");
const pubMedRouter = express.Router();

pubMedRouter.get("/", pubMedConroller.getResearchData);

module.exports = pubMedRouter;
