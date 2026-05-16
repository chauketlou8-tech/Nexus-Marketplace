const postgreConnection = require("../utils/postgreConnection");
const asyncHandler = require("../middleware/AsyncHandler");
const jwt = require("jsonwebtoken");
const { CustomError } = require("../errors/CustomError");

const refreshUserToken = asyncHandler(async (req, res, next) => {
    const { refreshToken } = req.body;
    const connection = await postgreConnection;

    if (!refreshToken) {
        return next(new CustomError("Refresh token is required", 400));
    }

    // verify token first
    let decoded;
    try {
        decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
        return next(new CustomError("Invalid refresh token", 401));
    }

    // check session exists
    const result = await connection.query(
        `select * from Sessions where refresh_token = $1`,
        [refreshToken]
    );

    const session = result.rows[0];

    if (!session) {
        return next(new CustomError("Refresh token not found", 401));
    }

    // check expiry
    if (new Date(session.expires_at) < new Date()) {
        await connection.query(
            `delete from Sessions where refresh_token = $1`,
            [refreshToken]
        );
        return next(new CustomError("Refresh token expired", 401));
    }

    // ROTATION: delete old session (prevents reuse)
    await connection.query(
        `delete from Sessions where refresh_token = $1`,
        [refreshToken]
    );

    // issue new access token
    const accessToken = jwt.sign(
        { id: decoded.id, name: decoded.name, role: decoded.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    // issue new refresh token
    const newRefreshToken = jwt.sign(
        { id: decoded.id, name: decoded.name, role: decoded.role },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    );

    // store new session
    await connection.query(
        `insert into Sessions (user_id, refresh_token, expires_at)
         values ($1, $2, $3)`,
        [
            decoded.id,
            newRefreshToken,
            new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        ]
    );

    return res.status(200).send({
        token: accessToken,
        refreshToken: newRefreshToken
    });
});

module.exports = refreshUserToken;