const express = require("express");
const EvidenceBrief = require("../models/EvidenceBrief");
const evidenceBriefController = require("../controllers/evidenceBriefController");

const evidenceBriefRouter = express.Router();

evidenceBriefRouter.post("/", evidenceBriefController.createEvidenceBrief);
evidenceBriefRouter.post(
  "/createComment/:evidenceBriefId",
  evidenceBriefController.createComment
);

module.exports = evidenceBriefRouter;
