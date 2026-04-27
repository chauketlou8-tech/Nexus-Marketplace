const express = require('express');
const app = express();

const cors = require("cors");
const authRoutes = require("./Routes/Auth.routes");

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/api/user', authRoutes);

module.exports = app;