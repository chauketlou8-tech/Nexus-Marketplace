const express = require('express');
const app = express();

const cors = require("cors");

const authRoutes = require("./routes/Auth.routes");
const productsRoutes = require("./routes/Products.routes");
const servicesRoutes = require("./routes/Services.routes");
const userRoutes = require("./routes/User.routes");
const ordersRoutes = require("./routes/Orders.routes");
const paymentsRoutes = require("./routes/Payments.routes");

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/api/user', authRoutes);
app.use('/api/user', productsRoutes);
app.use('/api/user', servicesRoutes);
app.use('/api/users', userRoutes);
app.use('/api/user/orders', ordersRoutes);
app.use('/api/user', paymentsRoutes);

module.exports = app;