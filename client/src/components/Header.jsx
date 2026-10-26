import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/book-table', label: 'Book Table' },
];

function Header() {
  const { items } = useCart();
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

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
            <ul className="navbar-nav mb-2 mb-lg-0">
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
              <NavLink className="header-icon" to="/account" aria-label="Demo account">
                <i className="bi bi-person" aria-hidden="true" />
              </NavLink>
              <NavLink className="header-icon cart-link" to="/cart" aria-label={`Shopping cart, ${cartCount} items`}>
                <i className="bi bi-cart-dash" aria-hidden="true" />
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </NavLink>
              <NavLink className="header-icon" to="/menu?focus=search" aria-label="Search menu">
                <i className="bi bi-search" aria-hidden="true" />
              </NavLink>
              <NavLink className="btn btn-warning" to="/menu">Order Online</NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
