const axios = require("axios");
require("dotenv").config();

const getResearchData = async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;
    const searchTerm = '"Ethiopian Public Health Institute"[Affiliation]';
    const titleFilter = req.query.title
      ? ` AND "${req.query.title}"[Title]`
      : "";
    const pageSize = 10; // Number of articles per page
    const page = req.query.page ? parseInt(req.query.page) : 1; // Get page number from query parameter
    const startIndex = (page - 1) * pageSize;

    const response = await axios.get(
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pmc&retmode=json&retmax=${pageSize}&retstart=${startIndex}&sort=pub+date&term=${searchTerm}${titleFilter}&api_key=${apiKey}`
    );
    const totalResults = parseInt(response.data.esearchresult.count); // Total number of articles
    const totalPages = Math.ceil(totalResults / pageSize); // Calculate total number of pages

    const pmids = response.data.esearchresult.idlist;
    const articles = await Promise.all(
      pmids.map(async (pmid) => {
        try {
          const articleResponse = await axios.get(
            `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pmc&id=${pmid}&retmode=json&api_key=${apiKey}`
          );
          const articleData = articleResponse.data.result[pmid];
          let url;
          if (articleData.elocationid) {
            url = `https://www.ncbi.nlm.nih.gov/pmc/articles/${articleData.elocationid}/`;
          } else if (articleData.uid) {
            url = `https://www.ncbi.nlm.nih.gov/pmc/articles/${articleData.uid}/`;
          } else {
            url = null;
          }
          return { ...articleData, url };
        } catch (error) {
          console.error(
            `Error fetching article with PMID ${pmid}:`,
            error.message
          );
          return null;
        }
      })
    );
    res.json({
      articles: articles,
      currentPage: page,
      totalPages,
      totalResults: totalResults,
    });
  } catch (error) {
    console.error("Error retrieving articles:", error);
    res.status(500).send("Error retrieving articles");
  }
};

module.exports = {
  getResearchData,
};
