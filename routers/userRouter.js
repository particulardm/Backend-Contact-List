const express = require('express');
const router = express.Router();

const {
    reg, login
} = require('../controllers/userController');

router.post('/reg', reg);

router.post('/login', login);

module.exports = router;

