function Footer() {
  const iconUrls = {
    facebook: new URL('../assets/icons8-facebook-48.png', import.meta.url).href,
    twitter: new URL('../assets/icons8-twitter-bird-48.png', import.meta.url).href,
    linkedin: new URL('../assets/icons8-linkedin-50.png', import.meta.url).href,
    instagram: new URL('../assets/icons8-instagram-64.png', import.meta.url).href,
    pinterest: new URL('../assets/icons8-pinterest-50.png', import.meta.url).href,
  };

  return (
    <footer>
      <section className="contop">
        <div className="con1">
          <h1>Contact Us</h1>
          <div className="location">
            <h1>✉︎   Location</h1>
          </div>
          <div className="call">
            <h1>☏   +91-99 99 99 99 99</h1>
          </div>
          <div className="email">
            <h1>✉︎   hello@flavourhub.com</h1>
          </div>
        </div>

        <div className="con2">
          <h1>FlavourHub</h1>
          <p>
            A foodie destination bringing together bold flavors, freshly baked meals, and welcoming hospitality.
          </p>
          <div className="icons">
            <img src={iconUrls.facebook} alt="Facebook" />
            <img src={iconUrls.twitter} alt="Twitter" />
            <img src={iconUrls.linkedin} alt="LinkedIn" />
            <img src={iconUrls.instagram} alt="Instagram" />
            <img src={iconUrls.pinterest} alt="Pinterest" />
          </div>
        </div>

        <div className="con3">
          <h1>Opening Hours</h1>
          <h2>Everyday</h2>
          <h3>10.00 Am - 10.00 Pm</h3>
        </div>
      </section>

      <section>
        <div className="conbottom">
          <h1>© 2026 All Rights Reserved By FlavourHub</h1>
          <h1>© Crafted for a better dining experience</h1>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
