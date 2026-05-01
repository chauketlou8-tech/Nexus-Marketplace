const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const { createReview, getReviews, deleteReview } = require("../controllers/Reviews.Controllers");

router.post("/", authMiddleware, createReview);
router.get("/:targetId", authMiddleware, getReviews);
router.delete("/:id", authMiddleware, deleteReview);

module.exports = router;