const asyncHandler = require('../middleware/asyncHandler');
const pool = require("../utils/postgreConnection");
const redisClient = require("../utils/redisClient");
const { CustomError } = require("../errors/CustomError");

// get all users (admin only)
const getUsers = asyncHandler(async (req, res) => {
    const results = await pool.query('select * from users');

    res.status(200).json({
        status: 'success',
        users: results.rows,
    });
});

// get single user
const getUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const results = await pool.query(
        `select * from users where id = $1`,
        [id]
    );

    const user = results.rows[0];

    if (!user) {
        return next(new CustomError("User not found", 404));
    }

    res.status(200).json({
        status: 'success',
        user,
    });
});

// logout
const logout = asyncHandler(async (req, res, next) => {
    const client = await redisClient;

    const userId = req.params.id;

    await client.del(`online:${userId}`);

    res.status(200).json({
        success: true,
        message: "Successfully logged out",
    });
});

module.exports = {
    getUsers,
    getUser,
    logout,
};