const express = require("express");
const router = express.Router();

const { getCategory, getCategories } = require("../controllers/category.Controllers");

router.get("/", getCategories);
router.get("/:id", getCategory);

module.exports = router;