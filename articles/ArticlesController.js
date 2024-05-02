const express = require("express");
const router = express.Router();
// const slugify = require("slugify");
// const Article = require("./Article")
const upload = require("../middleware/imageUpload");
const Category = require("../categories/Category");

router.get("/articles/new", (req, res) => {
    Category.findAll().then(categories => {
        res.render("articles/newArticle", { categories: categories });
    })
});

router.post("/articles/save", upload.single('imagePath'), (req, res) => {
    res.redirect("/");
});

module.exports = router