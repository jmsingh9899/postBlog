// const express = require('express');
// const router = express.Router();
// const {User} = require('../models');

// router.get("/login", (req, res) => {
//     if (req.session.user) {
//         res.redirect("home")
//     } else {
//         res.render("login", {
//             user: req.session.user
//         })
//     }
// })

// router.post("/login", (req, res) => {
//     User.findOne({
//         where: {
//             username: req.body.username
//         }
//     }).then(foundUser => {
//         if (!foundUser) {
//             res.status(401).json({ message: "incorrect username or password" })
//         } else {
//             if (bcrypt.compareSync(req.body.password, foundUser.password)) {
//                 req.session.user = {
//                     username: foundUser.username,
//                     id: foundUser.id,
//                     logged_in: true
//                 }
//                 console.log('nice')
//             } else {
//                 res.status(401).json({ message: "incorrect email or password" })
//             }
//         }
//     }).catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     })
// })


// router.get("/logout", (req, res) => {
//     req.session.destroy();
//     res.redirect("/")
// })

// module.exports = router