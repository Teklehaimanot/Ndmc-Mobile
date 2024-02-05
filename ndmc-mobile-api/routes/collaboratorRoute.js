const express = require("express");
const collboratorController = require("../controllers/collaboratorController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const collaboratorRouter = express.Router();

collaboratorRouter.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  collboratorController.createCollaborator
);
collaboratorRouter.get("/", collboratorController.getCollaborators);
collaboratorRouter.patch(
  "/:collaboratorId",
  authMiddleware,
  roleMiddleware("admin"),
  collboratorController.updateCollaborator
);
collaboratorRouter.get(
  "/:collaboratorId",
  collboratorController.getCollaboratorById
);
collaboratorRouter.delete(
  "/:collaboratorId",
  authMiddleware,
  roleMiddleware("admin"),
  collboratorController.deleteCollaboratorById
);

module.exports = collaboratorRouter;
