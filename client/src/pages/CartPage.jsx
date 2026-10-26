import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CartPage() {
  const { items, updateQuantity, removeFromCart } = useCart();
  const total = items.reduce((sum, item) => sum + (Number(item.price) || 0) * item.quantity, 0);

  return (
    <section className="cart-page container py-5">
      <h1>Your Cart</h1>
      <p className="text-muted">Cart preview only. Online ordering and payment are not connected.</p>

      {items.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <Link className="btn btn-warning" to="/menu">Browse the menu</Link>
        </div>
      ) : (
        <>
          <ul className="cart-items list-unstyled">
            {items.map((item) => (
              <li className="cart-item" key={item.id}>
                <div className="cart-item-details">
                  <h2>{item.name}</h2>
                  <p>₹{item.price} each</p>
                </div>
                <div className="cart-item-controls">
                  <button
                    className="btn btn-outline-dark"
                    type="button"
                    aria-label={`Remove one ${item.name}`}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <i className="bi bi-dash" aria-hidden="true" />
                  </button>
                  <span aria-label={`${item.quantity} in cart`}>{item.quantity}</span>
                  <button
                    className="btn btn-outline-dark"
                    type="button"
                    aria-label={`Add one ${item.name}`}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <i className="bi bi-plus" aria-hidden="true" />
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
                <strong>₹{((Number(item.price) || 0) * item.quantity).toFixed(2)}</strong>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <strong>Total: ₹{total.toFixed(2)}</strong>
          </div>
          <Link className="btn btn-warning" to="/menu">Continue shopping</Link>
          <Link className="btn btn-outline-dark ms-2" to="/book-table">Book a table instead</Link>
        </>
      )}
    </section>
  );
}

export default CartPage;
