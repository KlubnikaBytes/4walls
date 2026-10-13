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
      <div className={`site-header ${show ? 'visible' : 'hidden'}`} style={{ zIndex: 200 }}>
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src="/logo.png" alt="4Walls Property Solutions" style={{ height: 'clamp(40px, 8vw, 60px)', width: 'auto', display: 'block' }} />
        </Link>

        {/* Desktop Nav */}
        <div className="nav-links desktop-nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/properties">Properties</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/interior">Interior</NavLink>
          <NavLink to="/knowledge">Knowledge Centre</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>
        <div className="desktop-nav contact-icon-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <style>{`
            .contact-icon-btn {
              display: flex;
              align-items: center;
              flex-direction: row;
              justify-content: flex-start;
              gap: 10px;
              background: transparent;
              padding: 8px;
              border-radius: 40px;
              text-decoration: none;
              overflow: hidden;
              max-width: 40px;
              height: 40px;
              box-sizing: border-box;
              white-space: nowrap;
              transition: max-width 0.4s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.4s, color 0.4s, box-shadow 0.4s;
            }
            .contact-icon-btn.whatsapp {
              color: #25D366;
            }
            .contact-icon-btn.whatsapp:hover {
              background: #25D366;
              color: #fff;
            }
            .contact-icon-btn.call {
              color: #007AFF;
            }
            .contact-icon-btn.call:hover {
              background: #007AFF;
              color: #fff;
            }
            .contact-icon-btn svg {
              flex-shrink: 0;
              width: 24px;
              height: 24px;
              display: block;
            }
            .contact-icon-btn:hover {
              max-width: 160px;
              box-shadow: 0 4px 16px rgba(0,0,0,0.15);
            }
            .contact-icon-btn span {
              font-size: 14px;
              font-weight: 600;
              color: inherit;
              opacity: 0;
              transition: opacity 0.2s ease;
            }
            .contact-icon-btn:hover span {
              opacity: 1;
              transition-delay: 0.15s;
            }
          `}</style>
          <a href="https://wa.me/919051806000" target="_blank" rel="noopener noreferrer" className="contact-icon-btn whatsapp" title="WhatsApp Us">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            <span>WhatsApp Us</span>
          </a>
          <a href="tel:+919051806000" className="contact-icon-btn call" title="Call Us">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <span>Call Us</span>
          </a>
          <button onClick={() => window.dispatchEvent(new Event('open-consultation'))} className="nav-cta" style={{ cursor: 'pointer', border: 'none', background: 'var(--ink)', color: 'var(--white)', padding: '10px 20px', borderRadius: '0', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', fontWeight: '600' }}>Book a Consultation</button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
          style={{ zIndex: 201, position: 'relative' }}
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

      {/* Mobile Nav Backdrop */}
      {isMobileMenuOpen && (
        <div
          onClick={closeMenu}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10,26,40,0.45)',
            zIndex: 98,
            backdropFilter: 'blur(2px)',
          }}
        />
      )}

      {/* Mobile Nav Overlay */}
      <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
        <NavLink to="/properties" onClick={closeMenu}>Properties</NavLink>
        <NavLink to="/services" onClick={closeMenu}>Services</NavLink>
        <NavLink to="/interior" onClick={closeMenu}>Interior</NavLink>
        <NavLink to="/knowledge" onClick={closeMenu}>Knowledge Centre</NavLink>
        <NavLink to="/about" onClick={closeMenu}>About</NavLink>
        <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
        <div style={{ display: 'flex', gap: '16px', marginTop: '24px', justifyContent: 'center' }}>
          <a href="https://wa.me/919051806000" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', color: '#25D366', textDecoration: 'none' }} title="WhatsApp Us">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          </a>
          <a href="tel:+919051806000" style={{ display: 'flex', alignItems: 'center', color: '#007AFF', textDecoration: 'none' }} title="Call Us">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </a>
        </div>
        <button onClick={() => { closeMenu(); window.dispatchEvent(new Event('open-consultation')); }} className="nav-cta" style={{ cursor: 'pointer', border: 'none', width: '100%', marginTop: '16px' }}>Book a Consultation</button>
      </div>
    </>
  );
}
