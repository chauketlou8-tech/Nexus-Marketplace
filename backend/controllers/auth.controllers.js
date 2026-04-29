require("dotenv").config();

const postgreConnection = require("../utils/postgreConnection");
const redisClient = require("../utils/redisClient");
const asyncHandler = require("../middleware/AsyncHandler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const connection = await postgreConnection;
    const client = await redisClient;

    if (!email || !password) {
        return res.status(400).send({
            error: "Email or Password is required",
        });
    }

    try{
        const result = await connection.query(
            `select * from Users where email = $1`,
            [email]
        );

        const user = result.rows[0];

        if (!user) {
            return res.status(404).send({
                error: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).send({
                error: "Passwords do not match",
            });
        }

        const userId = user.id;
        const secret = process.env.JWT_SECRET;
        const refreshSecret = process.env.JWT_REFRESH_SECRET;

        // FIX: correct field name (no isAdmin in DB)
        const token = jwt.sign(
            { id: userId, name: user.name, role: user.role },
            secret,
            { expiresIn: "1h" }
        );

        const refreshToken = jwt.sign(
            { id: userId, name: user.name, role: user.role },
            refreshSecret,
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
    }
    catch(err) {
        return res.status(500).send({
            error: err.message,
        });
    }
});

// create user
const createUser = asyncHandler(async (req, res) => {
    const { name, email, password, year } = req.body;

    const adminEmails = ["chktlo003@myuct.ac.za"];
    const role = adminEmails.includes(email) ? "admin" : "student";

    const connection = await postgreConnection;
    const client = await redisClient;

    const hashedPassword = await hashPassword(password);

    try{
        const results = await connection.query(
            `select * from Users where email = $1`,
            [email]
        );

        const existsUser = results.rows[0];

        if (existsUser) {
            return res.status(401).send({
                error: "email already in use",
            });
        }

        const userResults = await connection.query(
            `insert into Users(name, email, password_hash, role, year)
         values ($1, $2, $3, $4, $5)
         returning *`,
            [name, email, hashedPassword, role, year]
        );

        const user = userResults.rows[0];
        const userId = user.id;

        const secret = process.env.JWT_SECRET;
        const refreshSecret = process.env.JWT_REFRESH_SECRET;

        const token = jwt.sign(
            { id: userId, name: user.name, role: user.role },
            secret,
            { expiresIn: "1h" }
        );

        const refreshToken = jwt.sign(
            { id: userId, name: user.name, role: user.role },
            refreshSecret,
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
    }
    catch(err) {
        return res.status(500).send({
            error: err.message,
        });
    }
});

// hash password
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(15);
    return await bcrypt.hash(password, salt);
};

module.exports = {
    loginUser,
    createUser,
};