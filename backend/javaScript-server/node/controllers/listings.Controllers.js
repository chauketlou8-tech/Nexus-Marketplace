const asyncHandler = require("../middleware/AsyncHandler");
const Listings = require("../models/listings");
const { CustomError } = require("../errors/CustomError");

const getListings = asyncHandler(async (req, res) => {
    const listings = await Listings.find({}).sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        listings,
    });
});

const getListing = asyncHandler(async (req, res, next) => {
    const { id } = req.params.id;
    const listing = await Listings.findOne({ itemId: id });

    if (!listing) {
        return next(new CustomError(`Listing ${req.params.id} Not Found `, 404));
    }

    return res.status(200).json({
        success: true,
        listing,
    });
});

module.exports = {
    getListings,
    getListing,
}