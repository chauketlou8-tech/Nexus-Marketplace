const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    serviceType: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    providerId: {
        type: Number,
        required: true,
        ref: "User",
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    courses: {
        type: [String],
        required: true,
    },
    skills: {
        type: [String],
        required: true,
    },
    availability: {
        type: String,
        required: true,
    },
    pricing: {
        amount: {
            type: Number,
            required: true,
        },
        unit: {
            type: String,
            required: true,
        }
    },
    images: {
        type: [String],
        required: true,
    }
}, { timestamps: true });

const servicesModel = mongoose.model('Service', servicesSchema);

module.exports = servicesModel;