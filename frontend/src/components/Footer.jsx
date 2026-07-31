import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="site-footer">
      <div className="footer-grid">
        <div>
          <Link to="/" style={{ display: 'inline-block', marginBottom: '16px' }}><img src="/logo.png" alt="4Walls Property Solutions" style={{ height: '96px', width: 'auto', display: 'block' }} /></Link>
          <p>Commercial office solutions across Kolkata — leasing, investment, interior and portfolio advisory under one roof.</p>
        </div>
        <div>
          <b>Explore</b>
          <ul className="footer-links">
            <li><Link to="/properties">Properties</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/interior">Interior Projects</Link></li>
            <li><Link to="/investment">Investment</Link></li>
          </ul>
        </div>
        <div>
          <b>Company</b>
          <ul className="footer-links">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/knowledge">Knowledge Centre</Link></li>
            <li><Link to="/knowledge">Resources</Link></li>
          </ul>
        </div>
        <div>
          <b>Legal</b>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
          </ul>
        </div>
        <div>
          <b>Contact</b>
          <ul>
            <li>+91 98XXX XXXXX</li>
            <li>hello@4walls.in</li>
            <li>New Town, Kolkata</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 4Walls Property Solutions</span>
        <span>Commercial Office Experts · Kolkata</span>
      </div>
    </div>
  );
}
