const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true
    },
    categoryType: {
        type: String,
        required: true,
        enum: ['Product', 'Service']
    }
}, { timestamps: true });

const categoryModel = mongoose.model('Category', categorySchema);

module.exports = categoryModel;