const express = require('express');
const app = express();

const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");

const authRoutes = require("./routes/Auth.routes");
const productsRoutes = require("./routes/Products.routes");
const servicesRoutes = require("./routes/Services.routes");
const userRoutes = require("./routes/User.routes");
const ordersRoutes = require("./routes/Orders.routes");
const paymentsRoutes = require("./routes/Payments.routes");
const chatRoutes = require("./routes/Chats.routes");
const messageRoutes = require("./routes/Messages.routes");
const refreshRoutes = require('./routes/refreshToken');
const coursesRoutes = require("./routes/Courses.routes");
const reviewsRoutes = require("./routes/Reviews.routes");
const summaryRoutes = require("./routes/ReviewsSummary.routes");
const categoryRoutes = require("./routes/Categories.routes");
const listingsRoutes = require("./routes/Listings.routes");

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/refreshToken', refreshRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/summary', summaryRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/listings', listingsRoutes);

//error handler
app.use(errorHandler);

module.exports = app;