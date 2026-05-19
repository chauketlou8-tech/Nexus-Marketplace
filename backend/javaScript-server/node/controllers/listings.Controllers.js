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
    const { id } = req.params;
    const listing = await Listings.findOne({ itemId: id });

    if (!listing) {
        return next(new CustomError(`Listing with itemId ${id} not found`, 404));
    }

    return res.status(200).json({
        success: true,
        listing,
    });
});

const getUserListings = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const listings = await Listings.find({ sellerId: userId }).sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        listings,
    });
});

const deleteListing = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listings.findById(id);

    if (!listing) {
        return next(new CustomError("Listing not found", 404));
    }

    if (listing.sellerId.toString() !== req.user.id) {
        return next(new CustomError("Unauthorized to delete this listing", 403));
    }

    await listing.deleteOne();

    res.status(200).json({
        success: true,
        message: "Listing deleted successfully",
    });
});

module.exports = {
    getListings,
    getListing,
    getUserListings,
    deleteListing,
};