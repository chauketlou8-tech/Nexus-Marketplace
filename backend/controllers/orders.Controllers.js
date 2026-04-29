const asyncHandler = require("../middleware/AsyncHandler");
const pool = require("../utils/postgreConnection");

const getOrders = asyncHandler(async (req, res) => {
    try{
        const results = await pool.query("select * from Orders");
        const orders = results.rows;

        return res.json({
            status: "success",
            orders,
        });
    }
    catch(err){
        return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
});

const getOrder = asyncHandler(async (req, res) => {
    const id = req.params.id;

    try{
        const results = await pool.query(`select * from Orders where id = $1`, [id]);
        const order = results.rows[0];

        if (!order) {
            return res.status(404).send({
                success: false,
                message: "Order not found.",
            });
        }

        return res.json({
            status: "success",
            order,
        });
    }
    catch(err){
        return res.status(500).send({
            success: false,
            message: err.message,
        });
    }
});

const createOrder = asyncHandler(async (req, res) => {
    const { buyer_id, seller_id, item_id, item_type, amount } = req.body;

    if (!buyer_id || !seller_id || !item_id || !item_type || !amount ) {
        return res.status(400).send({
            success: false,
            message: "information missing",
        });
    }

    try{
        const results = await pool.query(`insert into Orders(buyer_id, seller_id, item_id, item_type, amount) values ($1, $2, $3, $4, $5) returning *`, [buyer_id, seller_id, item_id, item_type, amount]);
        const order = results.rows[0];

        return res.status(201).json({
            status: "order success",
            order,
        });

    }
    catch(err){
        return res.status(500).send({
            success: false,
            message: err.message,
        });
    }
});

module.exports = {
    getOrders,
    createOrder,
    getOrder,
}