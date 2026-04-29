const Services = require("../models/Services");
const asyncHandler = require("../middleware/asyncHandler");
const Category = require("../models/categories");
const Listing = require("../models/listings");

const getService = asyncHandler(async (req, res) => {
    try{
        const service = await Services.find(req.params.id);

        if (!service) {
            return res.status(404).send("Service not found!");
        }

        return res.status(200).json({
            status: "success",
            data: service,
        });
    }
    catch(err) {
        return res.status(500).send({ error: err.message });
    }
});

const getServices = asyncHandler(async (req, res) => {
    try{
        const services = await Services.find({});

        res.status(200).json({
            status: "success",
            data: services,
        });
    }
    catch(err) {
        return res.status(500).send({ error: err.message });
    }
});

const createService = asyncHandler(async (req, res) => {
    const {  title, description, pricing, providerId, categoryId, availability, images, deliveryMode, status } = req.body;

    if (!title || !description || Object.keys(pricing).length <= 0 || !providerId || !categoryId || Object.keys(availability).length <= 0 || !images.length || deliveryMode.length || !status) {
        return res.status(400).json({
            success: false,
            message: "field missing required fields"
        });
    }

    try{
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
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
            itemType: "Product",
            sellerId: providerId,
            price: pricing.price,
        });

        return res.status(201).json({
            status: "success",
            message: "service created successfully",
        });
    }
    catch(err) {
        return res.status(500).send({ error: err.message });
    }
});

module.exports = {
    getServices,
    createService,
    getService,
}