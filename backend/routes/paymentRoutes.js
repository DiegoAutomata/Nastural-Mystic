const express = require('express');
const router = express.Router();
const { createPreference, confirmOrder } = require('../controllers/paymentController');

router.post('/create_preference', createPreference);
router.post('/confirm_order', confirmOrder);

module.exports = router;
