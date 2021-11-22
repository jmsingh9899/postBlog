const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../models');
const bcrypt = require("bcrypt");


router.get("/", (req, res) => {
    if (!req.session.user) {
        res.redirect('/login')
    } else {
        Post.findAll({
            include: [User, Comment]
        }).then(postData => {
            if (postData.length) {
                const hbsposts = postData.map(post => post.get({ plain: true }))
                // res.json(hbsposts)
                res.render("home", {
                    post: hbsposts
                })
            } else {
                res.status(404).json({ message: "No users found!" })
            }

        })
    }
})
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/")
})

router.get("/api/user", (req, res) => {
    if (req.session.user) {
        Post.findAll({
            where: {
                Userid: req.session.user.id
            },
        }).then(foundData => {
            res.json(foundData)
        })
    } else {
        res.render('login')
    }
})

router.get("/login", (req, res) => {
    if (req.session.user) {
        res.redirect("/")
    } else {
        res.render("login", {
            user: req.session.user
        })
    }
});

router.post("/login", (req, res) => {
    User.findOne({
        where: {
            username: req.body.user
        }
    }).then(foundUser => {
        if (!foundUser) {
            res.status(401).json({ message: "incorrect email or password" })
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.user = {
                    userName: foundUser.username,
                    id: foundUser.id,
                    logged_in: true
                }
                res.render("home", {
                    user: req.session.user
                })
            } else {
                res.status(401).json({ message: "incorrect email or password" })
            }
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.post("/signup", (req, res) => {
    User.create({
        username: req.body.user,
        password: req.body.password,
    }).then(newUser => {
        req.session.user = {
            userName: newUser.username,
            id: newUser.id,
            logged_in: true
        }
        res.render("home", {
            user: req.session.user
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ message: "an error occured", err: err })
    })
})

module.exports = router;