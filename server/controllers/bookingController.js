const { pool } = require('../config/db');

const createBooking = async (req, res, next) => {
  try {
    const booking = req.body;
    const { name, phone, email, persons, booking_date } = booking;

    const [result] = await pool.execute(
      'INSERT INTO bookings (name, phone, email, persons, booking_date) VALUES (?, ?, ?, ?, ?)',
      [name.trim(), phone.trim(), email.trim(), Number(persons), booking_date]
    );

    return res.status(201).json({
      success: true,
      message: 'Booking created successfully.',
      data: {
        id: result.insertId,
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        persons: Number(persons),
        booking_date,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createBooking };
