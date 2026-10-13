import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <style>{`
        .site-footer-premium {
          background: linear-gradient(135deg, #0b1a2a 0%, #102a43 100%);
          color: #cfd8d0;
          padding: 64px 48px 32px;
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        .footer-glow {
          position: absolute;
          top: 0;
          right: 0;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(31, 149, 164, 0.08) 0%, rgba(0,0,0,0) 70%);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(30%, -30%);
        }
        .footer-grid-premium {
          display: grid;
          grid-template-columns: 1.5fr repeat(4, 1fr);
          gap: 40px;
          margin-bottom: 48px;
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }
        @media (max-width: 900px) {
          .footer-grid-premium {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 600px) {
          .footer-grid-premium {
            grid-template-columns: 1fr;
          }
        }
        .footer-logo-link {
          display: inline-block;
          margin-bottom: 24px;
          transition: transform 0.3s ease;
        }
        .footer-logo-link:hover {
          transform: scale(1.02);
        }
        .footer-desc {
          font-size: 13.5px;
          color: #9aa79f;
          line-height: 1.6;
          max-width: 280px;
        }
        .footer-heading {
          display: block;
          color: #ffffff;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 20px;
          opacity: 0.9;
        }
        .footer-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer-list li, .footer-list a {
          color: #9aa79f;
          text-decoration: none;
          font-size: 13px;
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-block;
        }
        .footer-list a:hover, .footer-list li.hoverable:hover {
          color: #1f95a4;
          transform: translateX(4px);
          cursor: pointer;
        }
        .footer-bottom-premium {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 24px;
          display: flex;
          justify-content: space-between;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          color: #849085;
          position: relative;
          z-index: 1;
          letter-spacing: 0.02em;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }
        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: #9aa79f;
          font-size: 13px;
          line-height: 1.5;
        }
      `}</style>
      <div className="site-footer-premium">
        <div className="footer-glow"></div>
        <div className="footer-grid-premium">
          <div>
            <Link to="/" className="footer-logo-link">
              <img src="/logo.png" alt="4Walls Property Solutions" style={{ height: '100px', width: 'auto', display: 'block', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }} />
            </Link>
            <p className="footer-desc">Commercial office solutions across Kolkata — leasing, investment, interior and portfolio advisory under one roof.</p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
              <a href="https://www.facebook.com/share/1KwsLs4bke/" target="_blank" rel="noreferrer" style={{ color: '#9aa79f', transition: 'color 0.2s', display: 'flex' }} onMouseOver={e => e.currentTarget.style.color = '#1f95a4'} onMouseOut={e => e.currentTarget.style.color = '#9aa79f'} title="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://www.instagram.com/4wallspropertysolution?stkn=ZWNrZzY3aTU3YjBt" target="_blank" rel="noreferrer" style={{ color: '#9aa79f', transition: 'color 0.2s', display: 'flex' }} onMouseOver={e => e.currentTarget.style.color = '#1f95a4'} onMouseOut={e => e.currentTarget.style.color = '#9aa79f'} title="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.linkedin.com/in/4walls-property-solutions-878152242" target="_blank" rel="noreferrer" style={{ color: '#9aa79f', transition: 'color 0.2s', display: 'flex' }} onMouseOver={e => e.currentTarget.style.color = '#1f95a4'} onMouseOut={e => e.currentTarget.style.color = '#9aa79f'} title="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://m.youtube.com/%404wallspropertysolutions211?fbclid=PAb21jcAUpoqFleHRuA2FlbQIxMQBwZG9mAnNydGMGYXBwX2lkDzU2NzA2NzM0MzM1MjQyNwABp0Zar8TheNZN8jjQnSM1KGgoEgl_JsviEhtj67lLfs4tkoqtZhs1zpMjke-i_aem_pVbFMhPVuMn-iv1zBbzFdA" target="_blank" rel="noreferrer" style={{ color: '#9aa79f', transition: 'color 0.2s', display: 'flex' }} onMouseOver={e => e.currentTarget.style.color = '#1f95a4'} onMouseOut={e => e.currentTarget.style.color = '#9aa79f'} title="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>
          </div>
          <div>
            <b className="footer-heading">Explore</b>
            <ul className="footer-list">
              <li><Link to="/properties">Properties</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/interior">Interior Projects</Link></li>
              <li><Link to="/investment">Investment</Link></li>
            </ul>
          </div>
          <div>
            <b className="footer-heading">Company</b>
            <ul className="footer-list">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/knowledge">Knowledge Centre</Link></li>
            </ul>
          </div>
          <div>
            <b className="footer-heading">Legal</b>
            <ul className="footer-list">
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Use</Link></li>
            </ul>
          </div>
          <div>
            <b className="footer-heading">Contact</b>
            <ul className="footer-list">
              <li className="contact-item">
                <a href="tel:+919051806000" style={{ display: 'contents', color: 'inherit', textDecoration: 'none' }}>
                  <span style={{ color: '#1f95a4', display: 'flex', alignItems: 'center', marginTop: '2px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </span>
                  +91 90518 06000
                </a>
              </li>
              <li className="contact-item">
                <a href="mailto:sales@4walls.co.in" style={{ display: 'contents', color: 'inherit', textDecoration: 'none' }}>
                  <span style={{ color: '#1f95a4', display: 'flex', alignItems: 'center', marginTop: '2px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </span>
                  sales@4walls.co.in
                </a>
              </li>
              <li className="contact-item">
                <span style={{ color: '#1f95a4', display: 'flex', alignItems: 'center', marginTop: '2px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </span>
                11F, 04, Street Number 372, Action Area I, IIF, New Town, Kolkata, Chakpachuria, West Bengal 700160
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom-premium">
          <span>© 2026 4Walls Property Solutions</span>
          <span>Commercial Office Experts · Kolkata</span>
        </div>
      </div>
    </>
  );
}
