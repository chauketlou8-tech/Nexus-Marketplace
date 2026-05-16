const asyncHandler = require("../middleware/AsyncHandler");
const pool = require("../utils/postgreConnection");
const { CustomError } = require("../errors/CustomError");

const getPayments = asyncHandler(async (req, res) => {
    const results = await pool.query("select * from Payments");
    const payments = results.rows;

    return res.status(200).json({
        success: true,
        payments,
        message: "success"
    });
});

const getPayment = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    const results = await pool.query(`select * from Payments where id = $1`, [id]);
    const payment = results.rows[0];

    if (!payment) {
        return next(new CustomError("Payment not found", 404));
    }

    return res.status(200).json({
        success: true,
        payment,
    });
});

const createPayment = asyncHandler(async (req, res, next) => {
    const { orderId, amount, payment_method, transaction_reference } = req.body;

    if (
        !orderId ||
        amount === undefined ||
        amount === null ||
        typeof amount !== "number" ||
        amount <= 0 ||
        !payment_method ||
        !transaction_reference
    ) {
        return next(new CustomError("invalid payment data", 400));
    }

    const results = await pool.query(`insert into Payments (order_id, amount, payment_method, transaction_reference) values($1, $2, $3, $4) returning *`, [orderId, amount, payment_method, transaction_reference]);
    const payment = results.rows[0];

    return res.status(201).json({
        success: true,
        payment,
    });
});

module.exports = {
    getPayments,
    createPayment,
    getPayment,
}