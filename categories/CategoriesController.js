const express = require("express");
const Category = require("./Category");
const router = express.Router();
const slugify = require("slugify");

router.get("/categories/new", (req, res) => {
    res.render("categories/newCategory");
});

router.post("/categories/save", (req, res) => {
    let title = req.body.title;
    if(title != undefined) {
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/");
        })
    }else {
        res.redirect("/categories/new");
    }
});

router.get("/categories", (req, res) => {
    Category.findAll().then(categories => {
        res.render("categories/categoriesList", { categories: categories });
    })
});

module.exports = router;