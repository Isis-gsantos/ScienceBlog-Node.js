const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const Article = require("./Article");
const upload = require("../middleware/imageUpload");
const Category = require("../categories/Category");
const adminAuth = require("../middleware/adminAuth");

router.get("/articles", adminAuth, (req, res) => {
    Article.findAll({
        include: [{ model: Category }]
    }).then(articles => {
        res.render("articles/articlesList", { articles: articles })
    })
});

router.get("/articles/new", adminAuth, (req, res) => {
    Category.findAll().then(categories => {
        res.render("articles/newArticle", { categories: categories });
    })
});

router.post("/articles/save", adminAuth, upload.single('imagePath'), (req, res) => {
    const title = req.body.title;
    const imagePath = req.file ? 'uploads/' + req.file.filename : null;
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

router.post("/articles/delete", adminAuth, (req, res) => {
    const id = req.body.id;

    if(id != undefined) {
        if(!isNaN(id)) {
            Article.destroy({
                where: { id: id }
            }).then(() => {
                res.redirect("/articles");
            })
        } else {
            res.redirect("/articles");
        }
    } else {
        res.redirect("/articles");
    }
});

router.get("/articles/edit/:id", adminAuth, (req, res) => {
    const id = req.params.id;

    Article.findByPk(id).then(article => {
        if(article != undefined) {
            Category.findAll().then(categories => {
                res.render("articles/edit", {categories: categories, article: article});
            })
        } else {
            res.redirect("/articles")
        }
    }).catch(err => {
        res.redirect("/articles")
    })
});

router.post("/articles/update", adminAuth, upload.single('imagePath'), (req, res) => {
    const id = req.body.id;
    const title = req.body.title;

    if (typeof title !== 'string' || title.trim() === '') {
        console.error('Slugify error: Title is not a string or is empty.');
        return res.status(400).send("Error: invalid title.");
    }

    const body = req.body.body;
    const category = req.body.category;
    const imagePath = req.file ? 'uploads/' + req.file.filename : null;

    
    let updateValues = { 
        title: title, 
        slug: slugify(title), 
        body: body, 
        categoryId: category 
    };

    if (imagePath) {
        updateValues.imagePath = imagePath;
    }

    Article.update(updateValues, {
        where: { id: id }
    }).then(() => {
        res.redirect("/articles");
    }).catch(err => {
        console.error('Update error:', err);
        res.redirect("/");
    });
});

router.get("/articles/page/:num", (req, res) => {
    var page = req.params.num;
    var offset = 0;

    if(isNaN(page) || page == 1) {
        offset = 0;
    } else {
        offset = (parseInt(page) - 1) * 8;
    }

    Article.findAll({
        limit: 8,
        offset: offset,
        order: [['id', 'DESC']]
    }).then(articles => {
        var next;
        if(offset + 8 >= articles.count) {
            next = false;
        } else {
            next = true;
        }

        var result = {
            articles: articles,
            next: next,
            page: parseInt(page)
        }

        Category.findAll().then(categories => {
            res.render("articles/page", {result: result, categories: categories});
        });
    });
});

module.exports = router