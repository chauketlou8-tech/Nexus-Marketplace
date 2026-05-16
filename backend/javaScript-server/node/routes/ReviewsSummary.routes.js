const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { getReviewSummary } = require("../controllers/reviewsSummary.Controllers");

router.get("/:user_id", authMiddleware, getReviewSummary);

module.exports = router;