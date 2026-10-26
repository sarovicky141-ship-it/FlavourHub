import { Link } from 'react-router-dom';

function Footer() {
  const iconUrls = {
    facebook: new URL('../assets/icons8-facebook-48.png', import.meta.url).href,
    twitter: new URL('../assets/icons8-twitter-bird-48.png', import.meta.url).href,
    linkedin: new URL('../assets/icons8-linkedin-50.png', import.meta.url).href,
    instagram: new URL('../assets/icons8-instagram-64.png', import.meta.url).href,
    pinterest: new URL('../assets/icons8-pinterest-50.png', import.meta.url).href,
  };
  const socialLinks = {
    facebook: 'https://www.facebook.com/',
    twitter: 'https://x.com/',
    linkedin: 'https://www.linkedin.com/',
    instagram: 'https://www.instagram.com/',
    pinterest: 'https://www.pinterest.com/',
  };

  return (
    <footer>
      <section className="contop">
        <div className="con1">
          <h2>Contact Us</h2>
          <div className="location">
            <Link to="/book-table#location-map">⌖ &nbsp;Location</Link>
          </div>
          <div className="call">
            <a href="tel:+919999999999">☏ &nbsp;+91-99 99 99 99 99</a>
          </div>
          <div className="email">
            <a href="mailto:hello@flavourhub.com">✉ &nbsp;hello@flavourhub.com</a>
          </div>
        </div>

        <div className="con2">
          <h2>FlavourHub</h2>
          <p>
            A foodie destination bringing together bold flavors, freshly baked meals, and welcoming hospitality.
          </p>
          <div className="icons">
            {Object.entries(iconUrls).map(([social, image]) => (
              <a key={social} href={socialLinks[social]} target="_blank" rel="noreferrer" aria-label={social}>
                <img src={image} alt="" />
              </a>
            ))}
          </div>
        </div>

        <div className="con3">
          <h2>Opening Hours</h2>
          <h2>Everyday</h2>
          <h3>10.00 Am - 10.00 Pm</h3>
        </div>
      </section>

      <section>
        <div className="conbottom">
          <p>© 2026 All Rights Reserved By FlavourHub</p>
          <p>© Crafted for a better dining experience</p>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
