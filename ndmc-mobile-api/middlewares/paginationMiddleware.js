const paginationMiddleware = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    try {
      const results = await model
        .find()
        .select("-password")
        .skip(skip)
        .limit(limit);
      const totalDocuments = await model.countDocuments();
      const totalPages = Math.ceil(totalDocuments / limit);

      const paginationInfo = {
        currentPage: page,
        totalPages: totalPages,
        nextPage: page < totalPages ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null,
      };
      req.paginatedResults = {
        success: true,
        pagination: paginationInfo,
        data: results,
      };
      next();
    } catch (error) {
      console.error("Error fetching paginated data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
};

module.exports = paginationMiddleware;
