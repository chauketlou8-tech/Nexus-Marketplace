const express = require('express');
const router = express.Router();
const { loginUser, createUser } = require('../controllers/auth.controllers');

//login
router.post('/login', loginUser );

//register
router.post('/register', createUser );

module.exports = router;