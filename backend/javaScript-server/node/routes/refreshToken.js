const express = require('express');
const router = express.Router();
const refreshUserToken = require('../controllers/refreshToken');

router.post('/refresh-token', refreshUserToken);

module.exports = router;