require("dotenv").config();

const postgreConnection = require("../utils/postgreConnection");
const redisClient = require("../utils/redisClient");
const asyncHandler = require("../middleware/AsyncHandler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { CustomError } = require("../errors/CustomError");
const hashPassword = require("../utils/hashPassword");

// login
const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const connection = await postgreConnection;
    const client = await redisClient;

    if (!email || !password) {
        return next(new CustomError("Missing fields", 400));
    }

    const result = await connection.query(
        `select id, name, email, role, year, is_verified, created_at, last_updated from Users where email = $1`,
        [email]
    );

    const user = result.rows[0];

    if (!user) {
        return next(new CustomError("Invalid credentials", 401)); //invalid email
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

    return res.status(200).send({
        user,
        token,
        refreshToken
    });
});

// create user
const createUser = asyncHandler(async (req, res, next) => {
    const { name, email, password, year } = req.body;

    if (!name || !email || !password) {
        return next(new CustomError("Missing fields", 400));
    }

    const adminEmails = ["chktlo003@myuct.ac.za"];
    const role = adminEmails.includes(email) ? "admin" : "student";

    const connection = await postgreConnection;
    const client = await redisClient;

    const hashedPassword = await hashPassword(password);

    const results = await connection.query(
        `select * from Users where email = $1`,
        [email]
    );

    const existsUser = results.rows[0];

    if (existsUser) {
        return next(new CustomError("Email already in use", 409));
    }

    const userResults = await connection.query(
        `insert into Users(name, email, password_hash, role, year)
         values ($1, $2, $3, $4, $5)
         returning id, name, email, role, year, is_verified, created_at, last_updated`,
        [name, email, hashedPassword, role, year]
    );

    const user = userResults.rows[0];
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

    await connection.query(
        `insert into Sessions (user_id, refresh_token, expires_at)
         values ($1, $2, $3)`,
        [userId, refreshToken, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)]
    );

    await client.set(`online:${userId}`, "true", { EX: 3600 });

    return res.status(200).send({
        user,
        token,
        refreshToken
    });
});

module.exports = {
    loginUser,
    createUser
};