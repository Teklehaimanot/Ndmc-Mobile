const express = require("express");
const EvidenceBrief = require("../models/EvidenceBrief");
const evidenceBriefController = require("../controllers/evidenceBriefController");
const paginationMiddleware = require("../middlewares/paginationMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const evidenceBriefRouter = express.Router();

evidenceBriefRouter.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  evidenceBriefController.createEvidenceBrief
);
evidenceBriefRouter.post(
  "/createComment/:evidenceBriefId",
  authMiddleware,
  evidenceBriefController.createComment
);
evidenceBriefRouter.get(
  "/",
  paginationMiddleware(EvidenceBrief, "title"),
  evidenceBriefController.getAllEvidenceBriefs
);

evidenceBriefRouter.get(
  "/:evidenceBriefId",
  evidenceBriefController.getEvidenceBriefById
);

evidenceBriefRouter.patch(
  "/:evidenceBriefId",
  authMiddleware,
  roleMiddleware("admin"),
  evidenceBriefController.updateEvidenceBrief
);

evidenceBriefRouter.get(
  "/search/:title",
  evidenceBriefController.searchEvidenceByTitle
);
evidenceBriefRouter.delete(
  "/:evidenceBriefId",
  authMiddleware,
  roleMiddleware("admin"),
  evidenceBriefController.deleteEvidenceBriefById
);

evidenceBriefRouter.get(
  "/downloadPdf/:evidenceBriefId",
  evidenceBriefController.downloadPdf
);
module.exports = evidenceBriefRouter;
