const asyncHandler = require("../middleware/asyncHandler");
const pool = require("../utils/postgreConnection");

const getPayments = asyncHandler(async (req, res) => {
    try{
        const results = await pool.query("select * from Payments");
        const payments = results.rows;

        return res.status(200).json({
            success: true,
            payments,
            message: "success"
        });
    }
    catch(err){
        return res.status(500).send({ error: err.message });
    }
});

const getPayment = asyncHandler(async (req, res) => {
    try{
        const id = req.params.id;

        const results = pool.query(`select * from Payments where id = $1`, [id]);
        const payment = results.rows[0];

        if (!payment) {
            return res.status(404).send({
                success: false,
                error: "Payment not found."
            });
        }

        return res.status(200).json({
            success: true,
            payment,
        });
    }
    catch(err){
        return res.status(500).send({ error: err.message });
    }
});

const createPayment = asyncHandler(async (req, res) => {
    const { orderId, amount, payment_method, transaction_reference } = req.body;

    if (!orderId || amount || !payment_method || !transaction_reference) {
        return res.status(400).send({
            success: false,
            message: "information missing"
        });
    }

    try{
        const results = pool.query(`insert into Payments (order_id, amount, payment_method, transaction_reference) values($1, $2, $3, $4) returning *`, [orderId, amount, payment_method, transaction_reference]);
        const payment = results.rows[0];

        return res.status(201).json({
            success: true,
            payment,
        });
    }
    catch(err){
        return res.status(500).send({
            success: false,
            error: err.message
        });
    }
});

module.exports = {
    getPayments,
    createPayment,
    getPayment,
}