const paginationMiddleware = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;

    const skip = (page - 1) * limit;

    try {
      const results = await model
        .find()
        .select("-password")
        .skip(skip)
        .limit(limit);
      req.paginatedResults = results;
      next();
    } catch (error) {
      console.error("Error fetching paginated data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
};

module.exports = paginationMiddleware;
