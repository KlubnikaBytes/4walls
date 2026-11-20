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
          <img src="/logo.png" alt="4Walls Property Solutions" style={{ height: 'clamp(34px, 7vw, 54px)', width: 'auto', display: 'block' }} />
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
        <div className="desktop-nav header-actions-group">
          <style>{`
            .header-actions-group {
              display: flex;
              align-items: center;
              gap: 12px;
            }
            .header-whatsapp-btn {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              color: #25D366;
              background: rgba(37, 211, 102, 0.08);
              border: 1px solid rgba(37, 211, 102, 0.28);
              text-decoration: none;
              transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
              flex-shrink: 0;
            }
            .header-whatsapp-btn svg {
              width: 22px;
              height: 22px;
              display: block;
            }
            .header-whatsapp-btn:hover {
              background: #25D366;
              color: #ffffff;
              border-color: #25D366;
              transform: translateY(-2px);
              box-shadow: 0 6px 16px rgba(37, 211, 102, 0.32);
            }
            .header-phone-btn {
              display: inline-flex;
              align-items: center;
              gap: 9px;
              height: 40px;
              padding: 0 16px;
              border-radius: 6px;
              background: #FFFFFF;
              border: 1px solid var(--line);
              text-decoration: none;
              color: var(--ink);
              box-shadow: 0 2px 6px rgba(16, 42, 67, 0.04);
              transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
              flex-shrink: 0;
            }
            .header-phone-btn .phone-icon-box {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 24px;
              height: 24px;
              border-radius: 50%;
              background: rgba(0, 122, 255, 0.1);
              color: #007AFF;
              transition: all 0.25s ease;
              flex-shrink: 0;
            }
            .header-phone-btn .phone-icon-box svg {
              width: 13px;
              height: 13px;
            }
            .header-phone-btn .phone-number-text {
              font-family: 'Inter', sans-serif;
              font-size: 13.5px;
              font-weight: 700;
              color: var(--ink);
              letter-spacing: 0.01em;
              white-space: nowrap;
              transition: color 0.25s ease;
            }
            .header-phone-btn:hover {
              border-color: #007AFF;
              background: #FFFFFF;
              transform: translateY(-2px);
              box-shadow: 0 6px 16px rgba(0, 122, 255, 0.16);
            }
            .header-phone-btn:hover .phone-icon-box {
              background: #007AFF;
              color: #FFFFFF;
            }
            .header-phone-btn:hover .phone-number-text {
              color: #007AFF;
            }
            .mobile-header-actions {
              display: none;
            }
            @media (max-width: 1200px) {
              .header-actions-group {
                gap: 8px;
              }
              .header-phone-btn {
                padding: 0 12px;
                gap: 7px;
              }
              .header-phone-btn .phone-number-text {
                font-size: 12.5px;
              }
            }
            @media (max-width: 900px) {
              .mobile-header-actions {
                display: flex !important;
                align-items: center;
                gap: 6px;
              }
              .mobile-quick-call-btn {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                height: 35px;
                padding: 0 10px;
                border-radius: 20px;
                background: #FFFFFF;
                border: 1px solid rgba(0, 122, 255, 0.28);
                color: var(--ink);
                text-decoration: none;
                font-family: 'Inter', sans-serif;
                font-size: 11.5px;
                font-weight: 700;
                letter-spacing: 0.01em;
                white-space: nowrap;
                box-shadow: 0 1px 4px rgba(16, 42, 67, 0.05);
                flex-shrink: 0;
                transition: all 0.2s ease;
              }
              .mobile-quick-call-btn .phone-mini-icon {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: rgba(0, 122, 255, 0.1);
                color: #007AFF;
                flex-shrink: 0;
              }
              .mobile-quick-call-btn .phone-mini-icon svg {
                width: 11px;
                height: 11px;
              }
              .mobile-quick-call-btn:active {
                background: rgba(0, 122, 255, 0.06);
                border-color: #007AFF;
                transform: scale(0.97);
              }
              .mobile-quick-whatsapp-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 35px;
                height: 35px;
                border-radius: 50%;
                background: rgba(37, 211, 102, 0.1);
                color: #25D366;
                border: 1px solid rgba(37, 211, 102, 0.28);
                text-decoration: none;
                flex-shrink: 0;
                transition: all 0.2s ease;
              }
              .mobile-quick-whatsapp-btn svg {
                width: 19px;
                height: 19px;
              }
              .mobile-quick-whatsapp-btn:active {
                transform: scale(0.95);
                background: #25D366;
                color: #FFFFFF;
              }
              .mobile-menu-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 35px;
                height: 35px;
                padding: 0;
                background: transparent;
                border: none;
                color: var(--ink);
                cursor: pointer;
                flex-shrink: 0;
              }
            }
            @media (max-width: 360px) {
              .mobile-quick-call-btn {
                padding: 0 7px;
                font-size: 10.5px;
                gap: 4px;
              }
            }
          `}</style>

          <a 
            href="https://wa.me/919051806000" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="header-whatsapp-btn" 
            title="Chat on WhatsApp (+91 90518 06000)"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </a>

          <a 
            href="tel:+919051806000" 
            className="header-phone-btn" 
            title="Call Us: +91 90518 06000"
          >
            <span className="phone-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </span>
            <span className="phone-number-text">+91 90518 06000</span>
          </a>

          <button 
            onClick={() => window.dispatchEvent(new Event('open-consultation'))} 
            className="nav-cta" 
            style={{ 
              cursor: 'pointer', 
              border: 'none', 
              background: 'var(--ink)', 
              color: 'var(--white)', 
              padding: '0 20px', 
              height: '40px',
              borderRadius: '6px', 
              boxShadow: '0 4px 12px rgba(16,42,67,0.18)', 
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              letterSpacing: '0.04em'
            }}
          >
            Book a Consultation
          </button>
        </div>

        {/* Mobile Quick Action Group & Menu Button */}
        <div className="mobile-header-actions">
          <a href="tel:+919051806000" className="mobile-quick-call-btn" title="Call Us: +91 90518 06000">
            <span className="phone-mini-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </span>
            <span className="mobile-phone-number">+91 90518 06000</span>
          </a>
          <a href="https://wa.me/919051806000" target="_blank" rel="noopener noreferrer" className="mobile-quick-whatsapp-btn" title="WhatsApp Us">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          </a>
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
        <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <a 
            href="tel:+919051806000" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '10px', 
              padding: '12px 16px',
              borderRadius: '8px',
              background: '#FFFFFF',
              border: '1px solid var(--line)',
              color: 'var(--ink)', 
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '14.5px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}
          >
            <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(0,122,255,0.1)', color: '#007AFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </span>
            <span>+91 90518 06000</span>
          </a>

          <a 
            href="https://wa.me/919051806000" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '10px', 
              padding: '12px 16px',
              borderRadius: '8px',
              background: 'rgba(37, 211, 102, 0.08)',
              border: '1px solid rgba(37, 211, 102, 0.25)',
              color: '#15803D', 
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '14.5px'
            }}
          >
            <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#25D366', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            </span>
            <span>WhatsApp Consultation</span>
          </a>
        </div>
        <button onClick={() => { closeMenu(); window.dispatchEvent(new Event('open-consultation')); }} className="nav-cta" style={{ cursor: 'pointer', border: 'none', width: '100%', marginTop: '16px' }}>Book a Consultation</button>
      </div>
    </>
  );
}
