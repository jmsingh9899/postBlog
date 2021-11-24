const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../models');
const bcrypt = require("bcrypt");


router.get("/", (req, res) => {
    Post.findAll({
        include: [User, Comment]
    }).then(postData => {
        if (postData.length) {
            const hbsData = postData.map(post => post.get({ plain: true }))
            if (req.session.user) {
                for (const obj of hbsData) {
                    obj.loggedIn = true
                }
            }
            // res.json(hbsData)
            res.render("home", {
                post: hbsData,
                user: req.session.user
            })
        }

    })
})
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/")
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

router.post("/comment", (req, res) => {
    Comment.create({
        comment: req.body.comment_body,
        PostId: req.body.PostsId
    })
})

router.get("/dashboard", (req, res) => {
    if (req.session.user.id) {
        Post.findAll({
            where: {
                Userid: req.session.user.id
            },
            include: [User]
        }).then(foundData => {
            const hbsData = foundData.map(post => post.get({ plain: true }))
            res.render('dashboard', {
                data: hbsData
            })
        })
    } else {
        res.render('login')
    }

})
router.put("/newPost", (req, res) => {
    Post.update({ content: req.body.content },
        {where: {id: req.body.id}}
    ).then(updated => {
        console.log('done')
    })
}
)

router.delete('/newPost/:id', (req,res) => {
    Post.destroy({where: {
        id: req.params.id
    }})
})

module.exports = router;