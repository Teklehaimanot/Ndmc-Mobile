const News = require("../models/News");
const User = require("../models/User");
const _ = require("lodash");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./news/",
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

const createNews = async (req, res) => {
  await uploadAsync(req, res);
  try {
    const imagePath = req.file ? req.file.path : null;
    const { title, description, date } = req.body;

    if (!title || !description || !imagePath) {
      return res.status(400).json({ error: "all fileds are required" });
    }
    const news = new News({
      title,
      description,
      image: imagePath,
      date,
    });

    const savedNews = await news.save();
    res.status(201).json(savedNews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createComment = async (req, res) => {
  try {
    const { userId, commentText } = req.body;
    const { newsId } = req.params;

    const news = await News.findById(newsId);

    if (!news) {
      return res.status(404).json({ error: "News not found" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    news.comments.push({ user: userId, comment: commentText });
    const updatedNews = await news.save();

    res.status(201).json(updatedNews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    res.status(200).json(req.paginatedResults);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
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
module.exports = {
  createNews,
  createComment,
  getAll,
};
