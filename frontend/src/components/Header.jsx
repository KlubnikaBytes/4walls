import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) { 
        setShow(false);
        setIsMobileMenuOpen(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <div className={`site-header ${show ? 'visible' : 'hidden'}`}>
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src="/logo.png" alt="4Walls Property Solutions" style={{ height: 'clamp(40px, 8vw, 60px)', width: 'auto', display: 'block' }} />
        </Link>

        {/* Desktop Nav */}
        <div className="nav-links desktop-nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/properties">Properties</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/interior">Interior</NavLink>
          <NavLink to="/investment">Investment</NavLink>
          <NavLink to="/knowledge">Knowledge Centre</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>
        <button onClick={() => window.dispatchEvent(new Event('open-consultation'))} className="nav-cta desktop-nav" style={{ cursor: 'pointer', border: 'none' }}>Book a Consultation</button>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
        <NavLink to="/properties" onClick={closeMenu}>Properties</NavLink>
        <NavLink to="/services" onClick={closeMenu}>Services</NavLink>
        <NavLink to="/interior" onClick={closeMenu}>Interior</NavLink>
        <NavLink to="/investment" onClick={closeMenu}>Investment</NavLink>
        <NavLink to="/knowledge" onClick={closeMenu}>Knowledge Centre</NavLink>
        <NavLink to="/about" onClick={closeMenu}>About</NavLink>
        <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
        <button onClick={() => { closeMenu(); window.dispatchEvent(new Event('open-consultation')); }} className="nav-cta" style={{ cursor: 'pointer', border: 'none', width: '100%', marginTop: '16px' }}>Book a Consultation</button>
      </div>
    </>
  );
}
