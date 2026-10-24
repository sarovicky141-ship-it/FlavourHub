const express = require('express');
const { createBooking } = require('../controllers/bookingController');
const { validateBooking } = require('../validation/bookingValidation');

const router = express.Router();

router.post('/bookings', validateBooking, createBooking);

module.exports = router;
