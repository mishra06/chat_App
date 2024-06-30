const express = require('express');
const authantation = require('../middleware/authantation');
const getUserControllerForSidebar = require('../controllers/user');
const router = express.Router();

router.get("/",authantation,getUserControllerForSidebar.getUser);

module.exports = router;