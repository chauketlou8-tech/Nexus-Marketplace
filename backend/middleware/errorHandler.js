require("dotenv").config();

const errorHandler = (err, req, res, next) => {
    //console.error(err.stack);
    console.error(err.message);
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    });

    next();
};

module.exports = errorHandler;