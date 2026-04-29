const postgreConnection = require("../utils/postgreConnection");
const asyncHandler = require("../middleware/AsyncHandler");
const jwt = require("jsonwebtoken");

const refreshUserToken = asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;
    const connection = await postgreConnection;

    if (!refreshToken) {
        return res.status(400).send({ error: 'Refresh token is required' });
    }

    try{
        // check if refresh token exists in Sessions table
        const result = await connection.query(
            `select * from Sessions where refresh_token = $1`,
            [refreshToken]
        );
        const session = result.rows[0];

        if (!session) {
            return res.status(401).send({ error: 'Invalid refresh token' });
        }

        // check if refresh token is expired
        if (new Date(session.expires_at) < new Date()) {
            await connection.query(`DELETE FROM Sessions WHERE refresh_token = $1`, [refreshToken]);
            return res.status(401).send({ error: 'Refresh token expired' });
        }

        // verify the token
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        // issue new access token
        const token = jwt.sign(
            { id: decoded.id, name: decoded.name, isAdmin: decoded.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).send({ token });
    }
    catch(err) {
        return res.status(500).send({ error: err.message });
    }
});

module.exports = refreshUserToken;