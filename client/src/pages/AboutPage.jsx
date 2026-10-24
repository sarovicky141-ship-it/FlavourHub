function AboutPage() {
  const aboutImage = new URL('../assets/about-img.png', import.meta.url).href;

  return (
    <section className="aboutsection py-5">
      <div className="container my-5">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="aboout-img sm-w-100">
              <img src={aboutImage} alt="About FlavourHub" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="contentabout p-3 m-3">
              <h2 style={{ marginLeft: '30px' }}>We Are FlavourHub</h2>
              <p style={{ marginLeft: '30px' }} className="text-start">
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.
              </p>
              <button type="button" className="btn btn-warning mx-4">
                Order Online <i className="bi bi-cart-check px-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
