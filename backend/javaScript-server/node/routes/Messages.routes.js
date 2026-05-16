const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const { createMessage, deleteMessage, updateMessage, readMessage, getMessage, getMessages } = require('../controllers/messages.Controllers');

router.route("/").post(authMiddleware, createMessage).patch(authMiddleware, readMessage).get(authMiddleware, getMessage);
router.route("/msg").get(authMiddleware, getMessages);
router.route("/:id").delete(authMiddleware, deleteMessage).patch(authMiddleware, updateMessage);

module.exports = router;