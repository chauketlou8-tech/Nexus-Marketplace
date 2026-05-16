const mongoose = require("mongoose");

const coursesSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    faculty: {
        type: String,
        required: true,
        enum: ["science", "commerce", "law", "health sciences"]
    },
    year: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

const coursesModel = mongoose.model("Courses", coursesSchema);

module.exports = coursesModel;

