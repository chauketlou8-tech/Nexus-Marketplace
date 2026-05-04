const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { getListings } = require("../controllers/listings.controllers");

router.get("/", authMiddleware, getListings);

module.exports = router;