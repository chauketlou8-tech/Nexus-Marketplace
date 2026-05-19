const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { getListings, getListing, getUserListings, deleteListing } = require("../controllers/listings.Controllers");

router.get("/", authMiddleware, getListings);
router.get("/user", authMiddleware, getUserListings);
router.get("/:id", authMiddleware, getListing);
router.delete("/:id", authMiddleware, deleteListing);

module.exports = router;