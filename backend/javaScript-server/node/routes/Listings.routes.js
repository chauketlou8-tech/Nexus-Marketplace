const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { getListings, getListing } = require("../controllers/listings.Controllers");

router.get("/", authMiddleware, getListings);
router.get("/:id", authMiddleware, getListing);

module.exports = router;