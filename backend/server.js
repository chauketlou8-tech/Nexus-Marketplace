require('dotenv').config();
const express = require('express');
const app = express();

app.listen(() => {
    console.log(`Server listening on port ${process.env.PORT || 3001}...`);
});