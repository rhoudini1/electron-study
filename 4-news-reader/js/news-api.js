const NewsAPI = require("newsapi");
require("dotenv").config();
const NEWSAPI_KEY = process.env.NEWSAPI_KEY;

const newsapi = new NewsAPI(NEWSAPI_KEY);

const getNews = async (category) => {
  const result = await newsapi.v2.topHeadlines({
    category,
    language: "en",
    country: "us",
  });
  return result.status === "ok" ? result.articles : [];
};

module.exports = { getNews };
