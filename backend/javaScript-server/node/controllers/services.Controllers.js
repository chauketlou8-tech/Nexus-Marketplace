const Services = require("../models/services");
const asyncHandler = require("../middleware/AsyncHandler");
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
        service,
    });
});
//get all services
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
        serviceType,
        description,
        providerId,
        categoryId,
        courses,
        skills,
        availability,
        pricing,
        images,
    } = req.body;

    if (
        !title ||
        !serviceType ||
        !description ||
        !providerId ||
        !categoryId ||
        !availability ||
        !pricing?.amount ||
        !pricing?.unit ||
        !images?.length
    ) {
        return next(new CustomError("Missing required fields", 400));
    }

    const category = await Category.findById(categoryId);
    if (!category) {
        return next(new CustomError("Category not found", 404));
    }

    const service = await Services.create({
        title,
        serviceType,
        description,
        providerId,
        categoryId,
        courses,
        skills,
        availability,
        pricing,
        images,
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