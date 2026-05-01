const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const { createMessage, deleteMessage, updateMessage } = require('../controllers/messages.controllers');

router.route("/").post(authMiddleware, createMessage);
router.route("/:id").delete(authMiddleware, deleteMessage).patch(authMiddleware, updateMessage);

module.exports = router;