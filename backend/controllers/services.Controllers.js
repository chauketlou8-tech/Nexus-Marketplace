const Services = require("../models/Services");
const asyncHandler = require("../middleware/asyncHandler");
const Category = require("../models/categories");
const Listing = require("../models/listings");
const { CustomError } = require("../errors/CustomError");

const getService = asyncHandler(async (req, res, next) => {
    const service = await Services.findById(req.params.id);

    if (!service) {
        return next(new CustomError("Service not found", 404));
    }

    res.status(200).json({
        status: "success",
        data: service,
    });
});

const getServices = asyncHandler(async (req, res) => {
    const services = await Services.find({});

    res.status(200).json({
        status: "success",
        services,
    });
});

const createService = asyncHandler(async (req, res, next) => {
    const {
        title,
        description,
        pricing,
        providerId,
        categoryId,
        availability,
        images,
        deliveryMode,
        status
    } = req.body;

    if (
        !title ||
        !description ||
        !pricing?.amount ||
        !providerId ||
        !categoryId ||
        !availability ||
        !images?.length ||
        !deliveryMode?.length ||
        !status
    ) {
        return next(new CustomError("Missing required fields", 400));
    }

    const category = await Category.findById(categoryId);
    if (!category) {
        return next(new CustomError("Category not found", 404));
    }

    const service = await Services.create({
        title,
        description,
        pricing,
        providerId,
        categoryId,
        availability,
        images,
        deliveryMode,
        status,
    });

    await Listing.create({
        itemId: service._id,
        itemType: "Service",
        sellerId: providerId,
        price: pricing.amount,
    });

    res.status(201).json({
        status: "success",
        message: "service created successfully",
        service
    });
});

module.exports = {
    getServices,
    createService,
    getService,
};