import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { getProperties } from '../utils/data';

const slides = [
  {
    id: 1,
    title: 'Mani Casadona',
    subtitle: "New Town's premier IT and commercial hub.",
    image: '/mani.jpg',
    link: '/mani-casadona',
    buttonText: 'Explore Properties →',
  },
  {
    id: 2,
    title: 'Ecospace Business Park',
    subtitle: 'A highly sought-after green business park in New Town.',
    image: '/ecospace.jpg',
    link: '/ecospace',
    buttonText: 'Explore Properties →',
  },
  {
    id: 3,
    title: 'Interior Designing',
    subtitle: 'We build intelligent, beautiful, and futuristic workspaces.',
    image: '/interior-future.png',
    link: '/interior',
    buttonText: 'Explore Interior Designs →',
  }
];

export default function Home() {
  const latestInterior = getProperties(4, 2); 
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 5 seconds timer
    return () => clearInterval(timer);
  }, []);

  const activeSlide = slides[currentSlide];

  return (
    <>
      {/* Slider Hero */}
      <div 
        className="hero-slider"
        style={{
          position: 'relative',
          width: '100%',
          height: '80vh',
          minHeight: '600px',
          overflow: 'hidden',
          cursor: 'pointer'
        }}
        onClick={() => navigate(activeSlide.link)}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: index === currentSlide ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              backgroundImage: `url('${slide.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Gradient Overlay for Text Readability */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(22, 35, 31, 0.9) 0%, rgba(22, 35, 31, 0.4) 50%, transparent 100%)'
            }} />
          </div>
        ))}

        <div style={{
          position: 'absolute',
          top: '50%',
          left: '48px',
          transform: 'translateY(-50%)',
          zIndex: 10,
          color: 'var(--white)',
          maxWidth: '600px',
          pointerEvents: 'none' // Let clicks pass through to the slider wrapper
        }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255, 0.1)', border: '1px solid rgba(255,255,255,0.3)', padding: '6px 16px', borderRadius: '40px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '24px' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', background: 'var(--brass)', borderRadius: '50%' }}></span>
            Kolkata's Only End-to-End Commercial Partner
          </div>
          <h1 style={{ fontSize: '64px', fontWeight: 600, lineHeight: 1.1, marginBottom: '20px', transition: 'all 0.5s', transform: 'translateY(0)' }}>
            {activeSlide.title}
          </h1>
          <p style={{ fontSize: '18px', color: '#cfd8d0', lineHeight: 1.6, marginBottom: '40px' }}>
            {activeSlide.subtitle}
          </p>
          <div className="btn-brass" style={{ display: 'inline-block', padding: '16px 32px', fontSize: '13px' }}>
            {activeSlide.buttonText}
          </div>
        </div>

        {/* Slider Navigation Dots */}
        <div style={{ position: 'absolute', bottom: '40px', left: '48px', display: 'flex', gap: '12px', zIndex: 10 }}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide(index);
              }}
              style={{
                width: index === currentSlide ? '32px' : '12px',
                height: '12px',
                borderRadius: '6px',
                background: index === currentSlide ? 'var(--brass)' : 'rgba(255,255,255,0.4)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Featured Spaces (Mani & Ecospace only) */}
      <section style={{ background: 'var(--white)' }} className="py-large">
        <div className="section-head" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '36px' }}>Featured spaces</h2>
          <p style={{ fontSize: '15px' }}>Premium commercial properties and IT hubs.</p>
        </div>
        <div className="card-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          
          <Link to="/mani-casadona" className="card hover-card" style={{ textDecoration: 'none', color: 'inherit', border: 'none', background: 'var(--paper)', borderRadius: '12px', overflow: 'hidden' }}>
            <div className="thumb" style={{ height: '320px', backgroundImage: 'url("/mani.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            </div>
            <div className="body" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>Mani Casadona</h3>
              <p style={{ color: 'var(--ink-soft)', lineHeight: 1.6, fontSize: '15px' }}>New Town's premier IT and commercial hub.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '20px 0', padding: '16px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
                <div><div style={{ fontFamily: 'IBM Plex Mono', fontSize: '9px', textTransform: 'uppercase', color: 'var(--ink-soft)', letterSpacing: '0.08em', marginBottom: '6px' }}>Available Space</div><div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)' }}>1,500 - 12,000 sq.ft</div></div>
                <div><div style={{ fontFamily: 'IBM Plex Mono', fontSize: '9px', textTransform: 'uppercase', color: 'var(--ink-soft)', letterSpacing: '0.08em', marginBottom: '6px' }}>Status</div><div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)' }}>Ready to Fit-out</div></div>
              </div>

              <div className="mono" style={{ color: 'var(--brass)', marginTop: '16px', fontSize: '12px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
                View Properties <span>→</span>
              </div>
            </div>
          </Link>

          <Link to="/ecospace" className="card hover-card" style={{ textDecoration: 'none', color: 'inherit', border: 'none', background: 'var(--paper)', borderRadius: '12px', overflow: 'hidden' }}>
            <div className="thumb" style={{ height: '320px', backgroundImage: 'url("/ecospace.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            </div>
            <div className="body" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>Ecospace Business Park</h3>
              <p style={{ color: 'var(--ink-soft)', lineHeight: 1.6, fontSize: '15px' }}>A highly sought-after green business park in New Town.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '20px 0', padding: '16px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
                <div><div style={{ fontFamily: 'IBM Plex Mono', fontSize: '9px', textTransform: 'uppercase', color: 'var(--ink-soft)', letterSpacing: '0.08em', marginBottom: '6px' }}>Available Space</div><div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)' }}>2,500 - 25,000 sq.ft</div></div>
                <div><div style={{ fontFamily: 'IBM Plex Mono', fontSize: '9px', textTransform: 'uppercase', color: 'var(--ink-soft)', letterSpacing: '0.08em', marginBottom: '6px' }}>Status</div><div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)' }}>Fully Furnished</div></div>
              </div>

              <div className="mono" style={{ color: 'var(--brass)', marginTop: '16px', fontSize: '12px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
                View Properties <span>→</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Futuristic Interior Design Section */}
      <section style={{ background: 'var(--ink)', color: 'var(--white)', position: 'relative', overflow: 'hidden' }} className="py-xlarge">
        <div style={{ position: 'absolute', top: '-50%', left: '-20%', width: '140%', height: '200%', background: 'radial-gradient(circle at center, rgba(169, 125, 47, 0.15) 0%, transparent 60%)', zIndex: 0 }}></div>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '40px' }}>
          <div className="futuristic-box" style={{ flex: '1 1 400px' }}>
            <div className="eyebrow" style={{ color: 'var(--brass)' }}>Future Workspaces</div>
            <h2 style={{ fontSize: 'clamp(32px, 8vw, 48px)', lineHeight: 1.1, marginBottom: '20px' }}>Interior Designing,<br/>Reimagined.</h2>
            <p style={{ color: '#a0aab2', fontSize: '16px', maxWidth: '400px', lineHeight: 1.6, marginBottom: '32px' }}>
              We build intelligent, beautiful, and futuristic workspaces. From bare shell to move-in ready with zero friction and ultimate precision.
            </p>
            <Link to="/interior" className="btn-brass" style={{ textDecoration: 'none', background: 'var(--brass)', color: 'var(--ink)', fontWeight: 600 }}>Explore Interior Services →</Link>
          </div>
          <div className="futuristic-box" style={{ flex: '1 1 400px', position: 'relative' }}>
            <div style={{ width: '100%', aspectRatio: '4/3', border: '1px solid rgba(255,255,255,0.1)', backgroundImage: 'url("/interior-future.png")', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)', zIndex: 1 }}></div>
              <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'var(--brass)', filter: 'blur(100px)', opacity: 0.15, zIndex: 2 }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services (Correct Original Style) */}
      <section style={{ paddingTop: 0, borderTop: 'none' }} className="mt-large">
        <div className="section-head">
          <h2>Our services</h2>
          <p>Everything an office needs, from first search to ongoing management.</p>
        </div>
        <div className="service-list" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div className="service-item"><span className="idx">01</span><h3>Office Leasing</h3><p>Find and negotiate the right space, fast.</p></div>
          <div className="service-item"><span className="idx">02</span><h3>Office Buying &amp; Investment</h3><p>Purchase advisory and rental-income properties.</p></div>
          <div className="service-item"><span className="idx">03</span><h3>Interior &amp; Workspace Design</h3><p>Fit-outs, furniture, and complete design delivery.</p></div>
          <div className="service-item"><span className="idx">04</span><h3>Property Management</h3><p>Rent collection, tenants, maintenance, paperwork.</p></div>
          <div className="service-item" style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div><span className="idx">05</span><h3>Portfolio Advisory</h3><p>For owners managing multiple commercial assets.</p></div>
            <Link to="/services" className="mono" style={{ fontSize: '11px', color: 'var(--brass)', borderBottom: '1px solid var(--brass)', textDecoration: 'none' }}>View all services →</Link>
          </div>
        </div>
      </section>

      {/* Stats (Correct Original Style) */}
      <div className="stat-band">
        <div><div className="num">12+</div><div className="lbl">Years Experience</div></div>
        <div><div className="num">640</div><div class="lbl">Transactions Closed</div></div>
        <div><div className="num">3.8M</div><div class="lbl">Sq.Ft Delivered</div></div>
        <div><div className="num">210+</div><div class="lbl">Companies Served</div></div>
      </div>

      {/* Interior Projects (Original style) */}
      <section>
        <div className="section-head">
          <h2>Interior projects</h2>
          <p>From bare shell to move-in ready — see recent fit-outs.</p>
        </div>
        <div className="card-grid">
          {latestInterior.map((p, i) => <PropertyCard key={i} {...p} />)}
        </div>
      </section>

      {/* Testimonials (Correct Original Style) */}
      <section style={{ paddingTop: 0, borderTop: 'none' }}>
        <div className="section-head"><h2>What clients say</h2><p></p></div>
        <div className="quote-row">
          <div className="quote">
            <div style={{ display: 'flex', gap: '4px', color: 'var(--brass)', marginBottom: '16px' }}>
              {'★★★★★'.split('').map((star, i) => <span key={i} style={{ fontSize: '20px' }}>{star}</span>)}
            </div>
            <p>"They took us from a 2,000 sqft office to a 5,000 sqft floor in six weeks, fit-out included."</p>
            <div className="who">— Operations Head, Sector V IT firm</div>
          </div>
          <div className="quote">
            <div style={{ display: 'flex', gap: '4px', color: 'var(--brass)', marginBottom: '16px' }}>
              {'★★★★★'.split('').map((star, i) => <span key={i} style={{ fontSize: '20px' }}>{star}</span>)}
            </div>
            <p>"The only broker in Kolkata who thinks like an advisor, not a salesperson."</p>
            <div className="who">— Commercial property investor</div>
          </div>
          <div className="quote">
            <div style={{ display: 'flex', gap: '4px', color: 'var(--brass)', marginBottom: '16px' }}>
              {'★★★★★'.split('').map((star, i) => <span key={i} style={{ fontSize: '20px' }}>{star}</span>)}
            </div>
            <p>"Portfolio advisory alone justified working with 4Walls across our three offices."</p>
            <div className="who">— Regional Director, BFSI</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-strip">
        <h3>Ready to find your next office space?</h3>
        <Link to="/contact" className="btn-brass" style={{ textDecoration: 'none' }}>Book a Site Visit →</Link>
      </div>
    </>
  );
}
