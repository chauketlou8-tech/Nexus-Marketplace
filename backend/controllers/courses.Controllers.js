const asyncHandler = require("../middleware/AsyncHandler");
const pool = require("../utils/postgreConnection");
const { CustomError } = require("../errors/CustomError");

// get all courses
const getCourses = asyncHandler(async (req, res) => {
    const result = await pool.query(`select * from Courses`);

    res.status(200).json({
        success: true,
        courses: result.rows
    });
});

// get single course
const getCourse = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const result = await pool.query(
        `select * from Courses where id = $1`,
        [id]
    );

    const course = result.rows[0];

    if (!course) {
        return next(new CustomError("Course not found", 404));
    }

    res.status(200).json({
        success: true,
        course
    });
});

// create course
const createCourse = asyncHandler(async (req, res, next) => {
    const { code, name, faculty, year } = req.body;

    if (!code || !name || !faculty || !year) {
        return next(new CustomError("Missing fields", 400));
    }

    const result = await pool.query(
        `insert into Courses(code, name, faculty, year) values ($1, $2, $3, $4) returning *`,
        [code.toUpperCase(), name, faculty, year],
    );

    res.status(201).json({
        success: true,
        course: result.rows[0]
    });
});

module.exports = {
    getCourses,
    getCourse,
    createCourse
};