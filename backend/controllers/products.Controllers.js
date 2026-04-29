const asyncHandler = require("../middleware/AsyncHandler");
const Products = require("../models/products");
const Category = require("../models/categories");
const Listing = require("../models/listings");

const getProduct = asyncHandler(async (req, res) => {
    try{
        const product = await Products.findById(req.params.id);

        if (!product) {
            return res.status(404).send("Product not found!");
        }

        return res.status(200).json({
            status: "success",
            data: product,
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
});

const getProducts = asyncHandler(async (req, res) => {
    try{
        const products = await Products.find({});

        return res.status(200).json({
            status: "success",
            data: products,
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

const createProduct = asyncHandler(async (req, res) => {
    const { title, description, price, sellerId, categoryId, condition, images, tags } = req.body;

    if (
        !title || !description || !price || !sellerId ||
        !categoryId || !condition ||
        !images || !images.length ||
        !tags || !tags.length
    ) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields"
        });
    }

    try {
        // validate category
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
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
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

module.exports = {
    getProducts,
    getProduct,
    createProduct,
}