require("dotenv").config();

const postgreConnection = require("../utils/postgreConnection");
const redisClient = require("../utils/redisClient");
const asyncHandler = require("../middleware/AsyncHandler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { CustomError } = require("../errors/CustomError");

// login
const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const connection = await postgreConnection;
    const client = await redisClient;

    if (!email || !password) {
        return next(new CustomError("Missing fields", 400));
    }

    const result = await connection.query(
        `select * from Users where email = $1`,
        [email]
    );

    const user = result.rows[0];

    if (!user) {
        return next(new CustomError("Invalid credentials", 401)); //invalid pythonEmail
    }

    const isMatch = await bcrypt.compare(password, user.password_hash); //invalid password

    if (!isMatch) {
        return next(new CustomError("Invalid credentials", 401));
    }

    const userId = user.id;
    const token = jwt.sign(
        { id: userId, name: user.name, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
        { id: userId, name: user.name, role: user.role },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    );

    // Session logic
    await connection.query(
        `insert into Sessions (user_id, refresh_token, expires_at)
         values ($1, $2, $3)`,
        [userId, refreshToken, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)]
    );

    // Redis online status
    await client.set(`online:${userId}`, "true", { EX: 3600 });

    delete user.password_hash;

    return res.status(200).send({
        user,
        token,
        refreshToken
    });
});

module.exports = {
    loginUser,
};