const asyncHandler = require("../middleware/AsyncHandler");
const Review = require("../models/reviews");
const { CustomError } = require("../errors/CustomError");

// create review
const createReview = asyncHandler(async (req, res, next) => {
    const { targetId, targetType, rating, comment } = req.body;

    if (!targetId || !targetType || !rating || !comment) {
        return next(new CustomError("Missing fields", 400));
    }

    if (!["Product", "Service"].includes(targetType)) {
        return next(new CustomError("Invalid target type", 400));
    }

    if (rating < 0 || rating > 5) {
        return next(new CustomError("Invalid rating", 400));
    }

    const review = await Review.create({
        targetId,
        targetType,
        userId: req.user.id,
        rating,
        comment
    });

    res.status(201).json({
        success: true,
        review
    });
});

// get reviews for product/service
const getReviews = asyncHandler(async (req, res) => {
    const { targetId } = req.params;

    const reviews = await Review.find({ targetId });

    res.status(200).json({
        success: true,
        reviews
    });
});

// delete review (owner only)
const deleteReview = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const review = await Review.findById(id);

    if (!review) {
        return next(new CustomError("Review not found", 404));
    }

    if (review.userId.toString() !== req.user.id) {
        return next(new CustomError("Not allowed", 403));
    }

    await Review.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: "Review deleted"
    });
});

module.exports = {
    createReview,
    getReviews,
    deleteReview
};