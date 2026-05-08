const asyncHandler = require("../middleware/AsyncHandler");
const { CustomError } = require("../errors/CustomError");
const Categories = require("../models/categories");

const getCategory = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    const category = await Categories.findById(id);

    if (!category) {
        return next(new CustomError("Category does not exist", 404));
    }

    return res.status(200).json({
        success: true,
        slug: category.slug,
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