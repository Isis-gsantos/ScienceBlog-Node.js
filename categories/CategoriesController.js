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

router.post("/categories/delete", (req, res) => {
    const id = req.body.id;

    if(id != undefined) {
        if(!isNaN(id)) {
            Category.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/categories");
            })
        } else {
            res.redirect("/categories");
        }
    } else {
        res.redirect("/categories");
    }
});

router.get("/categories/edit/:id", (req, res) => {
    const id = req.params.id;

    if(isNaN(id)) {
        res.redirect("/categories");
    } 

    Category.findByPk(id).then(category => {
        if(category != undefined) {
            res.render("categories/edit", { category: category })
        } else {
            res.redirect("/categories")
        }
    }).catch(err => {
        res.redirect("/categories")
    })
});

module.exports = router;