const articleService = require("../service/service.article");
const cloudinary = require("../config/config.cloudinary");

const getAll = async (req, res) => {
  try {
    const data = await articleService.getAll();
    return res.status(200).json({
      message: "List All Data",
      data,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const createArticle = async (req, res) => {
  const { title, slug, shortDescription, content } = req.body;
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "articles",
  });
  const imageUrl = result.secure_url;
  const articleData = {
    title,
    slug,
    shortDescription,
    content,
    images: imageUrl,
  };
  try {
    const newArticle = await articleService.createArticle(articleData);
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Handle GET request to fetch all articles
const getAllArticles = async (req, res) => {
  const {
    title,
    slug,
    sortField,
    sortOrder = "asc",
    page = 1,
    limit = 10,
  } = req.query;
  const filter = {};
  if (title) filter.title = { $regex: new RegExp("^" + title, "i") };
  if (slug) filter.slug = { $regex: new RegExp("^" + slug, "i") };
  const sortOptions = {};
  if (sortField) sortOptions[sortField] = sortOrder === "desc" ? -1 : 1;

  // Calculate pagination options
  const skip = (page - 1) * limit;
  const limitNumber = parseInt(limit);
  try {
    const { data, total } = await articleService.getAllArticles(
      filter,
      sortOptions,
      skip,
      limitNumber
    );
    // const articles = await articleService.getAllArticles();
    res.status(200).json({
      message: "List All Data",
      data,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Handle GET request to fetch an article by slug
const getArticleBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;
    const article = await articleService.getArticleBySlug(slug);
    if (!article) {
      res.status(404).json({ error: "Article not found" });
    } else {
      res.json(article);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Handle GET request to fetch an article by ID
const getArticleById = async (req, res) => {
  try {
    const articleId = req.params.id;
    const article = await articleService.getArticleById(articleId);
    if (!article) {
      res.status(404).json({ error: "Article not found" });
    } else {
      res.json(article);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Handle PUT request to update an article by ID
const updateArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    const articleData = req.body;

    // Check if a file is included in the request
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "articles",
      });
      articleData.images = result.secure_url;
    }

    const updatedArticle = await articleService.updateArticle(
      articleId,
      articleData
    );

    if (!updatedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.json(updatedArticle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Handle DELETE request to delete an article by ID
const deleteArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    const deletedArticle = await articleService.deleteArticle(articleId);
    if (!deletedArticle) {
      res.status(404).json({ error: "Article not found" });
    } else {
      res.json(deletedArticle);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
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
