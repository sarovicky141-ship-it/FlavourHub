import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { createBooking } from '../services/api';

const initialValues = {
  name: '',
  phone: '',
  email: '',
  persons: '',
  booking_date: '',
};

const getLocalDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const validate = (values, minimumDate) => {
  const errors = {};

  const name = values.name.trim();
  const phone = values.phone.trim();
  const email = values.email.trim();
  const persons = Number(values.persons);
  if (!name) errors.name = 'Please enter your name.';
  else if (name.length > 150) errors.name = 'Name must be 150 characters or fewer.';
  if (!/^\d{10}$/.test(phone)) errors.phone = 'Phone number must be 10 digits.';
  if (!email || email.length > 150 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address (150 characters or fewer).';
  }
  if (!Number.isInteger(persons) || persons < 1 || persons > 6) {
    errors.persons = 'Please select between 1 and 6 persons.';
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(values.booking_date) || values.booking_date < minimumDate) {
    errors.booking_date = 'Date must be today or later.';
  }

  return errors;
};

function BookingPage() {
  const location = useLocation();
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submissionInProgress = useRef(false);
  const [minimumDate] = useState(getLocalDate);

  useEffect(() => {
    if (location.hash === '#location-map') {
      document.getElementById('location-map')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.hash]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submissionInProgress.current) return;

    const nextErrors = validate(formData, minimumDate);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus({ type: 'error', message: 'Please fix the highlighted fields.' });
      return;
    }

    submissionInProgress.current = true;
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      await createBooking({
        ...formData,
        phone: formData.phone.trim(),
        email: formData.email.trim(),
      });

      setStatus({ type: 'success', message: 'Booking successful! We will confirm your table soon.' });
      setFormData(initialValues);
      setErrors({});
    } catch (error) {
      setErrors(error.fieldErrors || {});
      setStatus({ type: 'error', message: error.message || 'Unable to save your booking.' });
    } finally {
      submissionInProgress.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <section className="secform my-5 py-5">
      <form id="booking-form" onSubmit={handleSubmit} noValidate>
        <h1>Book A Table</h1>

        <div className="fname">
          <label htmlFor="name" className="form-label">Name</label>
          <div className="input-group input-group-sm mb-3">
            <input type="text" id="name" name="name" className={`form-control ${errors.name ? 'is-invalid' : ''}`} placeholder="Name" maxLength={150} autoComplete="name" aria-invalid={Boolean(errors.name)} value={formData.name} onChange={handleChange} />
          </div>
          {errors.name && <span className="error-message text-danger small">{errors.name}</span>}
        </div>

        <div className="fnumber">
          <label htmlFor="phone" className="form-label">Phone number</label>
          <div className="input-group input-group-sm mb-3">
            <input type="tel" id="phone" name="phone" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} placeholder="10-digit phone number" inputMode="numeric" pattern="[0-9]{10}" maxLength={10} autoComplete="tel" aria-invalid={Boolean(errors.phone)} value={formData.phone} onChange={handleChange} />
          </div>
          {errors.phone && <span className="error-message text-danger small">{errors.phone}</span>}
        </div>

        <div className="femail">
          <label htmlFor="email" className="form-label">Email</label>
          <div className="mb-3">
            <input type="email" id="email" name="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="Email" maxLength={150} autoComplete="email" aria-invalid={Boolean(errors.email)} value={formData.email} onChange={handleChange} />
          </div>
          {errors.email && <span className="error-message text-danger small">{errors.email}</span>}
        </div>

        <div className="fpersions">
          <label htmlFor="persons" className="form-label">Number of persons</label>
          <div className="input-group mb-3">
            <select className={`form-select ${errors.persons ? 'is-invalid' : ''}`} id="persons" name="persons" aria-invalid={Boolean(errors.persons)} value={formData.persons} onChange={handleChange}>
              <option value="">Select number of persons</option>
              {[1, 2, 3, 4, 5, 6].map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>
          {errors.persons && <span className="error-message text-danger small">{errors.persons}</span>}
        </div>

        <div className="fdate">
          <label htmlFor="date" className="form-label">Booking date</label>
          <div className="input-group input-group-sm mb-3">
            <input type="date" id="date" name="booking_date" className={`form-control ${errors.booking_date ? 'is-invalid' : ''}`} min={minimumDate} aria-invalid={Boolean(errors.booking_date)} value={formData.booking_date} onChange={handleChange} />
          </div>
          {errors.booking_date && <span className="error-message text-danger small">{errors.booking_date}</span>}
        </div>

        <div className="fbutton">
          <button type="submit" className="btn btn-warning" disabled={isSubmitting}>
            {isSubmitting ? 'Booking...' : 'Book Now'}
          </button>
        </div>

        {status.message && (
          <div className={`mt-3 alert ${status.type === 'success' ? 'alert-success' : 'alert-danger'}`} role="status" aria-live="polite">
            {status.message}
          </div>
        )}
      </form>

      <div className="gmap" id="location-map">
        <iframe
          title="FlavourHub location map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.905641730466!2d80.22325137483915!3d12.84937068745485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52678b6ec7b719%3A0xc0cf6f565e5669c7!2sSLA%20Institute!5e0!3m2!1sen!2sin!4v1756042143724!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}

export default BookingPage;
