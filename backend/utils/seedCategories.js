require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Category = require("../models/categories");

const seedCategories = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        await Category.deleteMany({});

        const categories = [
            { name: "Books", slug: "books" },
            { name: "Electronics", slug: "electronics" },
            { name: "Tutoring", slug: "tutoring" },
            { name: "Accommodation", slug: "accommodation" },
            { name: "Other", slug: "other" }
        ];

        await Category.insertMany(categories);

        console.log("Categories seeded");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

void seedCategories();