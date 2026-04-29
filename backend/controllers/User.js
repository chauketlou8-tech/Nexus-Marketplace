const asyncHandler = require('../middleware/asyncHandler');
const pool = require("../utils/postgreConnection");

const getUsers = asyncHandler(async (req, res) => {
    try{
        const results = await pool.query('select * from users');
        console.log(results);
        const users = results.rows;

        return res.status(200).json({
            status: 'success',
            users,
        });
    }
    catch(err) {
        return res.status(500).send({ error: err.message });
    }
});

const getUser = asyncHandler(async (req, res) => {
    try{
        const id = req.params.id;

        const results = await pool.query(`select * from users where id = $1`, [id]);
        const user = results.rows[0];

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found.',
            });
        }

        return res.status(200).json({
            status: 'success',
            user,
        });
    }
    catch(err) {
        return res.status(500).send({ error: err.message });
    }
});

module.exports = {
    getUsers,
    getUser,
}