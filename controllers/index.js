const express = require('express');
const router = express.Router();

const frontEndRoutes = require("./frontEndRoutes.js");
router.use(frontEndRoutes);

module.exports = router;