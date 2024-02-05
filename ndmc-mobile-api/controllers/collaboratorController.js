const Collaborator = require("../models/Collaborator");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Optional: Limit the file size (1 MB in this case)
}).single("image");

const uploadAsync = (req, res) => {
  return new Promise((resolve, reject) => {
    upload(req, res, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const createCollaborator = async (req, res) => {
  try {
    await uploadAsync(req, res);
    const imagePath = req.file ? req.file.path : null;
    const { name, link } = req.body;

    if ((!name || !imagePath, !link)) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newCollaborator = new Collaborator({
      name,
      image: imagePath,
      link,
    });
    const savedCollaborator = await newCollaborator.save();

    res.status(201).json(savedCollaborator);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCollaborators = async (req, res) => {
  try {
    const collaborators = await Collaborator.find();

    res.status(200).json(collaborators);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateCollaborator = async (req, res) => {
  const { collaboratorId } = req.params;

  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          error: "File upload failed",
        });
      }

      const imagePath = req.file ? req.file.path : null;
      const { name, link } = req.body;

      if (!name || !link) {
        return res.status(400).json({
          error: "collaborator name and link is required",
        });
      }

      const collaborator = await Collaborator.findById(collaboratorId);

      if (!collaborator) {
        return res.status(404).json({
          error: "Evidence Brief not found",
        });
      }
      collaborator.name = name;
      collaborator.link = link;

      if (imagePath) {
        collaborator.image = imagePath;
      }
      const updatedCollaborator = await collaborator.save();
      res.status(200).json(updatedCollaborator);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getCollaboratorById = async (req, res) => {
  try {
    const { collaboratorId } = req.params;

    const collaborator = await Collaborator.findById(collaboratorId);

    if (!collaborator) {
      return res.status(404).json({ error: "Collaborator not found" });
    }

    res.status(200).json(collaborator);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCollaboratorById = async (req, res) => {
  try {
    const { collaboratorId } = req.params;
    const deleteCollaborator = await Collaborator.findByIdAndDelete(
      collaboratorId
    );

    if (!deleteCollaborator) {
      return res.status(404).json({ error: "Collaborator not found" });
    }

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createCollaborator,
  getCollaborators,
  updateCollaborator,
  getCollaboratorById,
  deleteCollaboratorById,
};
