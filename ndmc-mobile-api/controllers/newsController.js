const News = require("../models/News");

const createNews = async (req, res) => {
  try {
    const { title, image, description, date } = req.body;
    const news = new News({
      title,
      description,
      image,
      date,
    });
    const savedNews = await news.save();
    res.status(201).json(savedNews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createNews,
};
