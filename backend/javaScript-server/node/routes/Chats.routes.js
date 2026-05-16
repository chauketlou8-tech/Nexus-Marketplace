const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { getChats, createChat, deleteChat, getChat } = require("../controllers/chats.Controllers");

router.route("/").get(authMiddleware, getChats).post(authMiddleware, createChat);
router.route("/chat").get(authMiddleware, getChat)
router.route("/:id").delete(authMiddleware, deleteChat);

module.exports = router;
