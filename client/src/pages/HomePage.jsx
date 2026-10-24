import MenuCard from '../components/MenuCard';
import SectionHeading from '../components/SectionHeading';
import useMenuItems from '../hooks/useMenuItems';

const heroSlides = [
  { title: 'Veg Pizza', text: 'Fresh mozzarella, basil, capsicum, onion, tomato, mushroom, and spiced paneer.', button: 'Order Online' },
  { title: 'Non-Veg Pizza', text: 'Juicy chicken, golden corn, smoky barbecue flavors, pepperoni.', button: 'Order Online' },
  { title: 'Desserts', text: 'Warm chocolate lava, rich fudge brownies, crunchy nuts, caramel drizzle.', button: 'Order Online' },
];

function HomePage() {
  const { menuItems, isLoading, error } = useMenuItems();
  const promoImage = new URL('../assets/o2.jpg', import.meta.url).href;

  return (
    <>
      <section className="hero">
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={index}
                className={index === 0 ? 'active' : ''}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
          <div className="carousel-inner">
            {heroSlides.map((slide, index) => (
              <div key={slide.title} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <img src={new URL('../assets/hero-bg.jpg', import.meta.url).href} style={{ opacity: 0 }} className="d-block w-100" alt={slide.title} />
                <div className="carousel-caption d-md-block">
                  <h5>{slide.title}</h5>
                  <p>{slide.text}</p>
                  <button type="button" className="btn btn-warning">{slide.button}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="discountsec py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="dixountbox text-white p-3 m-3">
                <div className="row">
                  <div className="col-md-6">
                    <div className="discountimg text-center">
                      <img src={promoImage} alt="discount" />
                    </div>
                  </div>
                  <div className="col-md-6 p-4">
                    <div className="discountcntent p-3 m-2 text-center">
                      <h3>Pizza Days</h3>
                      <p>20% Off</p>
                      <button type="button" className="btn btn-warning rounded-pill">
                        Order Online <i className="bi bi-cart-check px-2" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="dixountbox text-white p-3 m-3">
                <div className="row">
                  <div className="col-md-6">
                    <div className="discountimg text-center">
                      <img src={promoImage} alt="discount" />
                    </div>
                  </div>
                  <div className="col-md-6 p-4">
                    <div className="discountcntent p-3 m-2 text-center">
                      <h3>Every Friday</h3>
                      <p>30% Off</p>
                      <button type="button" className="btn btn-warning rounded-pill">
                        Order Online <i className="bi bi-cart-check px-2" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="menusection py-5">
        <div className="container">
          <SectionHeading title="Our Menu" />
          <div className="row">
            {isLoading ? (
              <div className="col-12 text-center py-4">Loading menu...</div>
            ) : error ? (
              <div className="col-12 text-center py-4 text-danger" role="alert">{error}</div>
            ) : (
              menuItems.slice(0, 6).map((item) => <MenuCard key={item.id} item={item} />)
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
