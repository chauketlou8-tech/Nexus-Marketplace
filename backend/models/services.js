const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    pricing: {
        amount: {
            type: Number,
            required: true
        },
        unit: {
            type: String,
            required: true
        }
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    availability: {
        days: {
            type: [String],
            required: true,
        },
        time: {
            type: String,
            required: true,
        }
    },
    deliveryMode: {
        type: [String],
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    images: {
        type: [String],
        required: true,
    },
    courseIds: [{
        type: Number,
        ref: 'Course'
    }]
}, { timestamps: true });

const servicesModel = mongoose.model('Service', servicesSchema);

module.exports = servicesModel;