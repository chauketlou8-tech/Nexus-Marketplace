const asyncHandler = require("../middleware/AsyncHandler");
const { CustomError } = require("../errors/CustomError");
const Categories = require("../models/categories");

const getCategory = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    const category = await Categories.findById(id);
    const slug = category.slug;

    if (!slug) {
        return next(new CustomError("Slug does not exist", 404));
    }

    return res.status(200).json({
        success: true,
        slug
    });
});

const getCategories = asyncHandler(async (req, res) => {
    const categories = await Categories.find({});

    return res.status(200).json({
        success: true,
        categories
    });
});

module.exports = {
    getCategory,
    getCategories
}