// articleRoutes.js
const router = require("express").Router();
const articleController = require("../controller/controller.article");
const storage = require("../config/config.multer");
const multer = require("multer");
const upload = multer({ storage });

// POST /articles - Create a new article
router.post("/create", upload.single("image"), articleController.createArticle);

// GET /articles - Retrieve all articles
router.get("/all", articleController.getAll);
router.get("/", articleController.getAllArticles);

// GET /articles/:id - Retrieve an article by ID
router.get("/id/:id", articleController.getArticleById);

// GET /articles/:slug - Retrieve an article by slug
router.get("/slug/:slug", articleController.getArticleBySlug);

// PUT /articles/:id - Update an article by ID
// router.put("/update/:id", articleController.updateArticle);
router.put(
  "/update/:id",
  upload.single("image"),
  articleController.updateArticle
);

// DELETE /articles/:id - Delete an article by ID
router.delete("/delete/:id", articleController.deleteArticle);

module.exports = router;
