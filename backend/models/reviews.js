const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    targetId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'targetType'
    },
    targetType: {
        type: String,
        required: true,
        enum: ["Product", "Service"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const reviewModel = mongoose.model('Review', reviewSchema);

module.exports = reviewModel;