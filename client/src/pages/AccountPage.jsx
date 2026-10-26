import { useState } from 'react';
import { Link } from 'react-router-dom';

function AccountPage() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    setProfile(formData);
  };

  return (
    <section className="account-page container py-5">
      <div className="account-card">
        <h1>Demo Account</h1>
        <p className="text-muted">
          This local demo does not create an account or authenticate you. No information is sent to a server.
        </p>
        {profile ? (
          <div className="alert alert-success" role="status">
            Demo profile saved for this visit: {profile.name} ({profile.email}).
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label className="form-label" htmlFor="account-name">Name</label>
            <input
              className="form-control mb-3"
              id="account-name"
              name="name"
              autoComplete="name"
              required
              value={formData.name}
              onChange={(event) => setFormData({ ...formData, name: event.target.value })}
            />
            <label className="form-label" htmlFor="account-email">Email</label>
            <input
              className="form-control mb-3"
              id="account-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
            />
            <button className="btn btn-warning" type="submit">Save demo profile</button>
          </form>
        )}
        <Link className="btn btn-outline-dark mt-3" to="/book-table">Book a table</Link>
      </div>
    </section>
  );
}

export default AccountPage;
