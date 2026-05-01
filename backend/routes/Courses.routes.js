const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { getCourses, getCourse, createCourse } = require("../controllers/courses.Controllers");

router.route("/").get(authMiddleware, getCourses).post(authMiddleware, createCourse);
router.get("/:id", authMiddleware, getCourse);

module.exports = router;