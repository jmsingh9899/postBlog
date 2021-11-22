const express = require('express');
const router = express.Router();

const frontEndRoutes = require("./frontEndRoutes.js");
router.use(frontEndRoutes);
// const loginRoutes = require('./loginRoutes.js')
// router.use(loginRoutes)

module.exports = router;