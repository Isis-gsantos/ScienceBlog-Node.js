const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const Article = require("./Article");
const upload = require("../middleware/imageUpload");
const Category = require("../categories/Category");

router.get("/articles", (req, res) => {
    Article.findAll({
        include: [{ model: Category }]
    }).then(articles => {
        res.render("articles/articlesList", { articles: articles })
    })
});

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

router.post("/articles/delete", (req, res) => {
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

router.get("/articles/edit/:id", (req, res) => {
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

router.post("/articles/update", upload.single('imagePath'), (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    // console.log("Título recebido:", title);

    if (typeof title !== 'string' || title.trim() === '') {
        console.error('Slugify error: Title is not a string or is empty.');
        return res.status(400).send("Error: invalid title.");
    }

    const body = req.body.body;
    const category = req.body.category;
    const imagePath = req.file ? req.file.path : undefined;
    
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


module.exports = router