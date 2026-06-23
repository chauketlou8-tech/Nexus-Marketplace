const asyncHandler = require("../middleware/asyncHandler");
const postgreConnection = require("../utils/postgreConnection");
const { CustomError } = require("../errors/CustomError");

const getNotifications = asyncHandler(async (req, res) => {
    const { user_id } = req.query; //user id so the notifications are for a specific user
    const connection = await postgreConnection;

    const result = await connection.query(`select * from notifications where user_id=$1`, [user_id]);
    const notifications = result.rows;

    return res.status(200).json({
        status: "success",
        notifications,
    });
});

const getNotification = asyncHandler(async (req, res, next) => {
    const { id } = req.params;//this is the notification id
    const connection = await postgreConnection;

    const result = await connection.query(`select * from notifications where id=$1`, [id]);
    const notification = result.rows[0];

    if (!notification) {
        return next(new CustomError("No notifications found.", 404));
    }

    return res.status(200).json({
        status: "success",
        notification,
    });
});

const createNotification = asyncHandler(async (req, res, next) => {
    const { id } = req.params; //user id
    const { title, message } = req.body;
    const connection = await postgreConnection;

    if (!title || !message) {
        return next(new CustomError("Missing required fields.", 400));
    }

    const result = await connection.query(`select * from users where id=$1`, [id]);
    const user = result.rows[0];

    if (!user) {
        return next(new CustomError("No users found.", 404));
    }

    const notificationResult = await connection.query(`insert into notifications (user_id, title, message) values(id, title, message) returning *`);
    const notification = notificationResult.rows[0];

    return res.status(201).json({
        status: "success",
        notification,
    });
});

const readNotification = asyncHandler(async (req, res) => {
    const { id } = req.params; //notification id
    const connection = await postgreConnection;

    await connection.query(`update notifications set is_read = true where id=$1`, [id]);
    return res.status(200).json({
        status: "success",
    });
});

module.exports = {
    getNotifications,
    getNotification,
    createNotification,
    readNotification,
}