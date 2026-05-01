const asyncHandler = require("../middleware/AsyncHandler");
const pool = require("../utils/postgreConnection");
const { CustomError } = require("../errors/CustomError");

// get orders (only user’s)
const getOrders = asyncHandler(async (req, res) => {
    const results = await pool.query(
        `select * from Orders where buyer_id = $1 or seller_id = $1`,
        [req.user.id]
    );

    res.json({
        status: "success",
        orders: results.rows,
    });
});

// get single order (protected)
const getOrder = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const results = await pool.query(
        `select * from Orders
         where id = $1 and (buyer_id = $2 or seller_id = $2)`,
        [id, req.user.id]
    );

    const order = results.rows[0];

    if (!order) {
        return next(new CustomError("Order not found", 404));
    }

    res.json({
        status: "success",
        order,
    });
});

const getAdminOrders = asyncHandler(async (req, res, next) => {
    const results = await pool.query(`select * from Orders`);
    const orders = results.rows;

    res.status(200).json({
        status: "success",
        orders,
    });
});

// create order
const createOrder = asyncHandler(async (req, res, next) => {
    const { seller_id, item_id, item_type, amount } = req.body;

    const buyer_id = req.user.id;

    if (!seller_id || !item_id || !item_type || !amount) {
        return next(new CustomError("Missing information", 400));
    }

    if (!["product", "service"].includes(item_type)) {
        return next(new CustomError("Invalid item type", 400));
    }

    if (buyer_id === seller_id) {
        return next(new CustomError("Cannot buy your own item", 400));
    }

    const results = await pool.query(
        `insert into Orders(buyer_id, seller_id, item_id, item_type, amount)
         values ($1, $2, $3, $4, $5)
         returning *`,
        [buyer_id, seller_id, item_id, item_type, amount]
    );

    res.status(201).json({
        status: "success",
        order: results.rows[0],
    });
});

module.exports = {
    getOrders,
    getOrder,
    createOrder,
    getAdminOrders
};