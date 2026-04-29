const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'itemType'
    },
    itemType: {
        type: String,
        required: true,
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'available',
    }
}, { timestamps: true });

const listingModel = mongoose.model('Listing', listingSchema);
module.exports = listingModel;