const express = require('express');
const router = express.Router();

const {
    reg
} = require('../controllers/userController');

router.post('/reg', reg);

module.exports = router;

