const express = require('express');
const MessageController = require("../controllers/message");
const authantation = require("../middleware/authantation");

const router = express.Router();

router.get("/:id",authantation,MessageController.getMessages);
router.post("/send/:id",authantation,MessageController.Message);

module.exports = router;