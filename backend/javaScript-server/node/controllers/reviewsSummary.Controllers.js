const asyncHandler = require("../middleware/AsyncHandler");
const pool = require("../utils/postgreConnection");

// get summary for user
const getReviewSummary = asyncHandler(async (req, res) => {
    const { user_id } = req.params;

    const result = await pool.query(
        `select * from Reviews where user_id = $1`,
        [user_id]
    );

    const reviews = result.rows;

    const avg =
        reviews.length > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0;

    res.status(200).json({
        success: true,
        total_reviews: reviews.length,
        avg_rating: avg
    });
});

module.exports = {
    getReviewSummary
};