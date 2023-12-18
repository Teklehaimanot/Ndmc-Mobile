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

module.exports = {
  createEvidenceBrief,
};
