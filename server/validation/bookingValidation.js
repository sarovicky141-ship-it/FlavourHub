const isValidDate = (value) => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
};

const getToday = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const validateBooking = (req, res, next) => {
  const booking = req.body;
  const errors = {};

  if (!booking || typeof booking !== 'object' || Array.isArray(booking)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide booking details.',
    });
  }

  const name = typeof booking.name === 'string' ? booking.name.trim() : '';
  const phone = typeof booking.phone === 'string' ? booking.phone.trim() : '';
  const email = typeof booking.email === 'string' ? booking.email.trim() : '';
  const persons = Number(booking.persons);
  const bookingDate = booking.booking_date;

  if (!name) errors.name = 'Name is required.';
  else if (name.length > 150) errors.name = 'Name must be 150 characters or fewer.';

  if (!/^\d{10}$/.test(phone)) errors.phone = 'Phone number must be 10 digits.';

  if (!email || email.length > 150 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address (150 characters or fewer).';
  }

  if (!Number.isInteger(persons) || persons < 1 || persons > 6) {
    errors.persons = 'Number of persons must be between 1 and 6.';
  }

  if (!isValidDate(bookingDate) || bookingDate < getToday()) {
    errors.booking_date = 'Booking date must be today or later.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Please correct the highlighted fields.',
      errors,
    });
  }

  req.body = { name, phone, email, persons, booking_date: bookingDate };
  return next();
};

module.exports = { validateBooking };
