const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");

router.get("/users", (req, res) => {
    res.send("Listagem de usuários");
});

router.get("/users/create", (req, res) => {
    res.render("users/create");
});

router.post("/users/create", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({where: { email: email }}).then(user => {
        if(user == undefined) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            User.create({
                email: email,
                password: hash
            }).then(() => {
                res.redirect("/");
            }).catch(err => {
                res.redirect("/");
            })
        } else {
            res.redirect("/users/create");
        }
    });
});

router.get("/login", (req, res) => {
    res.render("users/login");
})

router.post("/authenticate", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({where: {email: email}}).then(user => {
        if(user != undefined) {
            const correct = bcrypt.compareSync(password, user.password);

            if(correct) {
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect("/");
            } else {
                res.redirect("/login");
            }
        } else {
            res.redirect("/login");
        }
    });
});

router.get("/logout", (req, res) => {
    req.session.user = undefined;
    res.redirect("/")
});

module.exports = router;