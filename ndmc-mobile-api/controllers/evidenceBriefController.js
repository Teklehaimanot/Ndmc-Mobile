const EvidenceBrief = require("../models/EvidenceBrief");
const User = require("../models/User");
const _ = require("lodash");
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
  limits: {
    fileSize: 1000000, // Optional: Limit the file size for images (1 MB in this case)
    fieldSize: 5000000, // Optional: Limit the field size for all fields (5 MB in this case)
  },
}).fields([
  { name: "image", maxCount: 1 },
  { name: "pdf", maxCount: 1 },
]);

const createEvidenceBrief = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          error: "File upload failed",
        });
      }

      const imagePath = req.files?.image ? req.files.image[0].path : null;
      const pdfPath = req.files?.pdf ? req.files.pdf[0].path : null;

      const { title, description, date } = req.body;

      if (!title || !description || !pdfPath || !imagePath) {
        return res.status(400).json({
          error: "All fields are required",
        });
      }

      const evidenceBrief = new EvidenceBrief({
        title,
        description,
        image: imagePath,
        pdf: pdfPath,
        date,
      });

      const savedEvidenceBrief = await evidenceBrief.save();
      res.status(201).json(savedEvidenceBrief);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const createComment = async (req, res) => {
  try {
    const { userId, commentText } = req.body;
    const { evidenceBriefId } = req.params;

    const evidenceBrief = await EvidenceBrief.findById(evidenceBriefId);

    if (!evidenceBrief) {
      return res.status(404).json({ error: "Evidence Brief not found" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    evidenceBrief.comments.push({ user: userId, comment: commentText });
    const updatedEvidenceBrief = await evidenceBrief.save();

    res.status(201).json(updatedEvidenceBrief);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllEvidenceBriefs = async (req, res) => {
  try {
    res.status(200).json(req.paginatedResults);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getEvidenceBriefById = async (req, res) => {
  try {
    const { evidenceBriefId } = req.params;

    const evidenceBrief = await EvidenceBrief.findById(evidenceBriefId);

    if (!evidenceBrief) {
      return res.status(404).json({ error: "Evidence Brief not found" });
    }

    res.status(200).json(evidenceBrief);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateEvidenceBrief = async (req, res) => {
  const { evidenceBriefId } = req.params;

  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          error: "File upload failed",
        });
      }

      const imagePath = req.files?.image ? req.files.image[0].path : null;
      const pdfPath = req.files?.pdf ? req.files.pdf[0].path : null;

      const { title, description, date } = req.body;

      if (!title || !description) {
        return res.status(400).json({
          error: "Title and description are required",
        });
      }

      // Find the evidence brief by ID
      const evidenceBrief = await EvidenceBrief.findById(evidenceBriefId);

      if (!evidenceBrief) {
        return res.status(404).json({
          error: "Evidence Brief not found",
        });
      }

      // Update evidence brief properties
      evidenceBrief.title = title;
      evidenceBrief.description = description;
      evidenceBrief.date = date || evidenceBrief.date;

      // Update image and PDF paths if provided
      if (imagePath) {
        evidenceBrief.image = imagePath;
      }
      if (pdfPath) {
        evidenceBrief.pdf = pdfPath;
      }

      // Save the updated evidence brief
      const updatedEvidenceBrief = await evidenceBrief.save();
      res.status(200).json(updatedEvidenceBrief);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteEvidenceBriefById = async (req, res) => {
  try {
    const { evidenceBriefId } = req.params;
    const deletedEvidenceBrief = await EvidenceBrief.findByIdAndDelete(
      evidenceBriefId
    );

    if (!deletedEvidenceBrief) {
      return res.status(404).json({ error: "Evidence Brief not found" });
    }

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createEvidenceBrief,
  createComment,
  getAllEvidenceBriefs,
  getEvidenceBriefById,
  updateEvidenceBrief,
  deleteEvidenceBriefById,
};
