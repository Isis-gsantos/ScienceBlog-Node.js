const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database")

const Article = require("./articles/Article");
const Category = require("./categories/Category");
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json()); 
app.use('/fa', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free'));

Category.hasMany(Article);
Article.belongsTo(Category);

//Database
connection
    .authenticate()
    .then(() => {
        connection.sync()
            .then(() => {
                console.log("Banco de dados sincronizado");
            })
            .catch((err) => {
                console.log("Erro ao sincronizar o banco de dados:", err);
            });
    })
    .catch((err) => {
        console.log("Erro na conexão com o banco de dados:", err);
    });

app.use("/", categoriesController);
app.use("/", articlesController);

app.get("/", (req, res) => {
    Article.findAll({
        order: [['id', 'DESC']],
        limit: 8
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render("index", { articles: articles, categories: categories });
        });
    });
});

app.get("/:slug", (req, res) => {
    let slug = req.params.slug;

    Article.findOne({
        where: { slug: slug }
    }).then(article => {
        if(article != undefined) {
            res.render("articles/article", { article: article });
        } else {
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    });
});

app.get("/category/:slug", (req, res) => {
    const slug = req.params.slug;

    Category.findOne({
        where: { slug: slug },
        include: [{ model: Article }],
    }).then(category => {
        if(category != undefined) {
            Category.findAll().then(categories => {
                res.render("index", {articles: category.articles, categories: categories}); 
            })
        } else {
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    })
});

app.listen(8000, () => {
    console.log("O servidor está rodando!");
});