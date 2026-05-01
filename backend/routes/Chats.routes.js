const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { getChats, createChat, deleteChat, getChat } = require("../controllers/Chats.controllers");

router.route("/").get(authMiddleware, getChats).post(authMiddleware, createChat)
router.route("/:id").get(authMiddleware, getChat).delete(authMiddleware, deleteChat);

module.exports = router;
