const postgreConnection = require("../utils/postgreConnection");
const redisClient = require("../utils/redisClient");

//login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const connection = await postgreConnection;
    const client = await redisClient;

    if (!email || !password) {
        return res.status(400).send({
            error: 'Email or Password is required',
        });
    }

    const result = await connection.query(`select * from users where email = $1`, [email]);
    const existsUser = result.rows[0];

    if (!existsUser) {
        return res.status(404).send({
            error: 'User not found',
        });
    }

    const userID = existsUser.id;

    //signs the user online
    await client.set(`online:${userID}`, 'true', { EX: 3600 });

    return res.status(200).send({
        user: existsUser,
    });
}



module.exports = {
    loginUser,
}