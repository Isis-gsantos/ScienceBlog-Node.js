const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const Article = require("./Article");
const upload = require("../middleware/imageUpload");
const Category = require("../categories/Category");

router.get("/articles/new", (req, res) => {
    Category.findAll().then(categories => {
        res.render("articles/newArticle", { categories: categories });
    })
});

router.post("/articles/save", upload.single('imagePath'), (req, res) => {
    const title = req.body.title;
    const imagePath = req.body.imagePath;
    const body = req.body.body;
    const category = req.body.category;

    Article.create({
        title: title,
        slug: slugify(title),
        imagePath: imagePath,
        body: body,
        categoryId: category
    }).then(() => {
        res.redirect("/");
    })
});

module.exports = router