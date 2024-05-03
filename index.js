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
    res.render("index")
});

app.listen(8000, () => {
    console.log("O servidor está rodando!");
});