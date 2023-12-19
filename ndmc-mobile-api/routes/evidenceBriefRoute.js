const express = require("express");
const EvidenceBrief = require("../models/EvidenceBrief");
const evidenceBriefController = require("../controllers/evidenceBriefController");
const paginationMiddleware = require("../middlewares/paginationMiddleware");

const evidenceBriefRouter = express.Router();

evidenceBriefRouter.post("/", evidenceBriefController.createEvidenceBrief);
evidenceBriefRouter.post(
  "/createComment/:evidenceBriefId",
  evidenceBriefController.createComment
);
evidenceBriefRouter.get(
  "/",
  paginationMiddleware(EvidenceBrief),
  evidenceBriefController.getAllEvidenceBriefs
);
module.exports = evidenceBriefRouter;
