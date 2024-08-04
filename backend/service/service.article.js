// articleService.js

const Article = require("../models/model.article");

const getAll = async (req, res) => {
  try {
    const data = await Article.find();
    return res.status(200).json({
      message: "List All Data",
      data,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Create a new article
const createArticle = async (articleData) => {
  try {
    const article = new Article(articleData);
    const savedArticle = await article.save();
    return savedArticle;
  } catch (error) {
    throw new Error(`Error in creating article: ${error.message}`);
  }
};

// Get all articles
const getAllArticles = async (
  filter = {},
  sortOptions = {},
  skip = 0,
  limit = 10
) => {
  try {
    // const articles = await Article.find();
    // return articles;
    const findQuery = await Article.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .exec();
    const countDocumentsPromise = await Article.countDocuments(filter);
    const [data, total] = await Promise.all([findQuery, countDocumentsPromise]);
    return { data, total };
  } catch (error) {
    throw new Error(`Error in fetching articles: ${error.message}`);
  }
};

// Get article by slug
const getArticleBySlug = async (slug) => {
  try {
    const article = await Article.findOne({ slug });
    return article;
  } catch (error) {
    throw new Error(`Error in fetching article by slug: ${error.message}`);
  }
};

// Get article by ID
const getArticleById = async (articleId) => {
  try {
    const article = await Article.findById(articleId);
    return article;
  } catch (error) {
    throw new Error(`Error in fetching article: ${error.message}`);
  }
};

// Update article by ID
const updateArticle = async (articleId, articleData) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      articleId,
      articleData,
      {
        new: true, // Return the updated document
        runValidators: true, // Validate the update operation
      }
    );
    return updatedArticle;
  } catch (error) {
    throw new Error(`Error in updating article: ${error.message}`);
  }
};

// Delete article by ID
const deleteArticle = async (articleId) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(articleId);
    return deletedArticle;
  } catch (error) {
    throw new Error(`Error in deleting article: ${error.message}`);
  }
};

module.exports = {
  getAll,
  createArticle,
  getAllArticles,
  getArticleById,
  getArticleBySlug,
  updateArticle,
  deleteArticle,
};
