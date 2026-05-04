const asyncHandler = require("../middleware/asyncHandler");
const Listings = require("../models/listings");
const { CustomError } = require("../errors/CustomError");

const getListings = asyncHandler(async (req, res) => {
    const listings = await Listings.find({}).sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        listings,
    });
});

module.exports = {
    getListings,
}