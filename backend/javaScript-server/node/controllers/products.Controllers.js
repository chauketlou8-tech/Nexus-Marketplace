const asyncHandler = require("../middleware/AsyncHandler");
const Products = require("../models/products");
const Category = require("../models/categories");
const Listing = require("../models/listings");
const { CustomError } = require("../errors/CustomError");

const getProduct = asyncHandler(async (req, res, next) => {
    const product = await Products.findById(req.params.id);

    if (!product) {
        return next(new CustomError("Product not found", 404));
    }

    return res.status(200).json({
        status: "success",
        data: product,
    });
});

const getProducts = asyncHandler(async (req, res) => {
    const products = await Products.find({});

    return res.status(200).json({
        status: "success",
        products,
    });
});

const createProduct = asyncHandler(async (req, res, next) => {
    const { title, description, price, sellerId, categoryId, condition, images, tags } = req.body;

    if (
        !title || !description || !price || !sellerId ||
        !categoryId || !condition ||
        !images || !images.length
    ) {
        return next(new CustomError("Missing required fields", 400));
    }

    if (typeof price !== "number" || price <= 0) {
        return next(new CustomError("Invalid price", 400));
    }

    const category = await Category.findById(categoryId);
    if (!category) {
        return next(new CustomError("Category doesn't exist", 404));
    }

    const product = await Products.create({
        title,
        description,
        price,
        sellerId,
        categoryId,
        condition,
        images,
        tags,
        status: "active",
    });

    await Listing.create({
        itemId: product._id,
        itemType: "Product",
        sellerId,
        price
    });

    return res.status(201).json({
        success: true,
        message: "Product created!",
        product
    });
});

const deleteProduct = asyncHandler(async (req, res, next) => {
    const product = await Products.findById(req.params.id);

    if (!product) {
        return next(new CustomError("Product not found", 404));
    }

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "Product deleted successfully",
    });
});

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
};