import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menus' },
  { to: '/about', label: 'About' },
  { to: '/book-table', label: 'Book Table' },
];

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            FlavourHub
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {navItems.map((item) => (
                <li className="nav-item" key={item.to}>
                  <NavLink
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    end={item.to === '/'}
                    to={item.to}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="d-flex align-items-center gap-2 header-actions">
              <span className="p-2 icon mx-1" aria-label="profile"><i className="bi bi-person" /></span>
              <span className="p-2 icon mx-1" aria-label="cart"><i className="bi bi-cart-dash" /></span>
              <span className="p-2 icon mx-1" aria-label="search"><i className="bi bi-search" /></span>
              <button type="button" className="btn btn-warning">Order Online</button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
