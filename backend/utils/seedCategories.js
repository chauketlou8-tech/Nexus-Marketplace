require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Category = require("../models/categories");

const seedCategories = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        await Category.deleteMany({});

        const categories = [
            { name: "Books", slug: "books", categoryType: "Product" },
            { name: "Electronics", slug: "electronics", categoryType: "Product" },
            { name: "Tutoring", slug: "tutoring", categoryType: "Service" },
            { name: "Coding", slug: "coding", categoryType: "Service" },
            { name: "Accommodation", slug: "accommodation",categoryType: "Product" },
            { name: "Writing", slug: "writing", categoryType: "Service" },
            { name: "Software", slug: "software", categoryType: "Service" },
            { name: "Reading", slug: "reading", categoryType: "Service" },
            { name: "Other", slug: "other",categoryType: "Product" }
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