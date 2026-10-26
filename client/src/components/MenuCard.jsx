import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function MenuCard({ item }) {
  const imageUrl = new URL(`../assets/${item.image}`, import.meta.url).href;
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(item);
    navigate('/cart');
  };

  return (
    <div className="col-md-4">
      <div className="foodmenu p-3 m-3">
        <div className="card">
          <div className="cardimg">
            <img src={imageUrl} className="card-img-top" alt={item.name} />
          </div>
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <p className="card-text">{item.description}</p>
            <div className="discount d-flex justify-content-between align-items-center">
              <h3>₹{item.price}</h3>
              <div>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={handleAddToCart}
                  aria-label={`Add ${item.name} to cart`}
                >
                  <i className="bi bi-cart-check px-2" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuCard;
