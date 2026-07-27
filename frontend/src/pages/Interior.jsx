import React, { useState, useEffect } from 'react';
import { interiorAssets } from '../utils/interiorData';

export default function Interior() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const videoAsset = interiorAssets.find(a => a.type === 'video');
  const imageAssets = interiorAssets.filter(a => a.type === 'image');
  const heroImages = imageAssets.slice(0, 5);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const quotes = [
    { type: "quote", text: "Design is not just what it looks like and feels like. Design is how it works.", author: "Steve Jobs" },
    { type: "quote", text: "Every great design begins with an even better story.", author: "Lorinda Mamo" },
    { type: "quote", text: "Details are not the details. They make the design.", author: "Charles Eames" },
    { type: "quote", text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" }
  ];

  // Interleave images with quotes for the masonry layout
  const mixedItems = [...imageAssets];
  if (videoAsset) {
    mixedItems.splice(2, 0, videoAsset);
  }
  mixedItems.splice(4, 0, quotes[0]);
  mixedItems.splice(12, 0, quotes[1]);
  mixedItems.splice(20, 0, quotes[2]);
  mixedItems.splice(28, 0, quotes[3]);

  const processSteps = [
    { title: "Brief & Strategy", desc: "Understanding your vision, culture, and operational needs." },
    { title: "Concept Design", desc: "Translating ideas into mood boards, layouts, and 3D renders." },
    { title: "Approvals", desc: "Finalizing materials, budgets, and compliance documentation." },
    { title: "Execution", desc: "On-site construction, MEP, and bespoke furniture installation." },
    { title: "Handover", desc: "Quality checks, deep cleaning, and project sign-off." }
  ];

  const handleNextZoom = (e) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % interiorAssets.length);
    }
  };

  const handlePrevZoom = (e) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + interiorAssets.length) % interiorAssets.length);
    }
  };

  const openLightbox = (path) => {
    const idx = interiorAssets.findIndex(a => a.path === path);
    if (idx !== -1) setLightboxIndex(idx);
  };

  return (
    <>
      <style>{`
        /* Hero Section */
        .interior-hero {
          position: relative;
          height: 80vh;
          min-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
        }
        .hero-slide-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          transition: opacity 1.5s ease-in-out;
        }
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(17,17,17,0.8));
          z-index: 1;
        }
        .hero-content {
          position: relative;
          z-index: 2;
          padding: 0 24px;
        }

        /* Masonry Gallery */
        .interior-masonry {
          column-count: 3;
          column-gap: 24px;
          padding: 0 48px;
          max-width: 1400px;
          margin: 80px auto;
        }
        @media (max-width: 1024px) { .interior-masonry { column-count: 2; padding: 0 24px; } }
        @media (max-width: 768px) { .interior-masonry { column-count: 1; padding: 0 16px; } }
        
        .interior-item {
          break-inside: avoid;
          margin-bottom: 24px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
          background: #000;
          cursor: pointer;
        }
        .interior-item:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        .interior-item img, .interior-item video {
          width: 100%;
          display: block;
          transition: transform 0.8s ease;
        }
        .interior-item:hover img, .interior-item:hover video {
          transform: scale(1.03);
        }
        
        /* Quote Cards */
        .interior-quote {
          break-inside: avoid;
          margin-bottom: 24px;
          padding: 64px 40px;
          background: var(--brass);
          border-radius: 12px;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 300px;
          color: #fff;
          box-shadow: 0 10px 30px rgba(181, 131, 90, 0.3);
        }
        .interior-quote h3 {
          font-size: 28px;
          line-height: 1.4;
          margin-bottom: 24px;
          font-weight: 500;
          color: #fff;
          font-style: italic;
        }
        .interior-quote p {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: rgba(255,255,255,0.8);
          font-weight: 600;
        }
        .interior-quote::before {
          content: '"';
          font-size: 80px;
          color: rgba(255,255,255,0.2);
          line-height: 1;
          margin-bottom: 8px;
          font-family: Georgia, serif;
        }

        /* Process Section */
        .process-section {
          padding: 100px 24px;
          background: #111;
          color: #fff;
        }
        .process-section .section-head h2 {
          color: #fff;
        }
        .timeline-container {
          display: flex;
          justify-content: space-between;
          max-width: 1200px;
          margin: 80px auto 0;
          position: relative;
        }
        .timeline-container::before {
          content: '';
          position: absolute;
          top: 32px;
          left: 5%;
          right: 5%;
          height: 1px;
          background: rgba(255,255,255,0.1);
          z-index: 0;
        }
        .timeline-step {
          position: relative;
          z-index: 1;
          text-align: center;
          flex: 1;
          padding: 0 16px;
        }
        .timeline-node {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #1a1a1a;
          border: 2px solid var(--brass);
          color: var(--brass);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: monospace;
          font-size: 20px;
          margin: 0 auto 32px;
          box-shadow: 0 0 20px rgba(0,0,0,0.5);
          transition: transform 0.3s ease, background 0.3s ease;
        }
        .timeline-step:hover .timeline-node {
          transform: scale(1.1);
          background: var(--brass);
          color: #fff;
        }
        .timeline-content h3 {
          font-size: 20px;
          margin-bottom: 12px;
          color: #fff;
        }
        .timeline-content p {
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          line-height: 1.6;
        }
        @media (max-width: 768px) {
          .timeline-container {
            flex-direction: column;
            margin-top: 40px;
          }
          .timeline-container::before {
            top: 0;
            bottom: 0;
            left: 32px;
            width: 1px;
            height: auto;
          }
          .timeline-step {
            display: flex;
            text-align: left;
            margin-bottom: 48px;
          }
          .timeline-node {
            margin: 0 24px 0 0;
            flex-shrink: 0;
          }
          .mc-lightbox-nav {
            width: 40px;
            height: 40px;
            font-size: 24px;
          }
          .mc-lightbox-nav.prev { left: 8px; }
          .mc-lightbox-nav.next { right: 8px; }
          .interior-quote {
            padding: 40px 24px;
            min-height: auto;
          }
          .interior-quote h3 {
            font-size: 22px;
          }
          .interior-hero {
            min-height: 400px;
            height: 60vh;
          }
        }

        /* Lightbox */
        .mc-lightbox {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.95);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }
        .mc-lightbox-content {
          max-width: 90vw;
          max-height: 90vh;
          object-fit: contain;
        }
        .mc-lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.1);
          color: #fff;
          border: none;
          font-size: 40px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .mc-lightbox-nav:hover {
          background: rgba(255,255,255,0.3);
        }
        .mc-lightbox-nav.prev { left: 24px; }
        .mc-lightbox-nav.next { right: 24px; }
        .mc-close-btn {
          position: absolute;
          top: 24px;
          right: 24px;
          background: transparent;
          border: none;
          color: #fff;
          font-size: 32px;
          cursor: pointer;
          z-index: 10000;
        }
        .mc-lightbox-count {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          color: #fff;
          font-size: 14px;
          letter-spacing: 2px;
        }
      `}</style>

      {/* Graphic Hero Section */}
      <div className="interior-hero">
        {heroImages.map((img, idx) => (
          <img 
            key={idx}
            className="hero-slide-bg" 
            src={img.path} 
            alt="Hero background"
            style={{ opacity: heroIndex === idx ? 1 : 0 }}
          />
        ))}
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="eyebrow" style={{ justifyContent: 'center', color: '#fff', borderColor: 'rgba(255,255,255,0.3)', marginBottom: '24px' }}>
            Office Interior Solutions
          </div>
          <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', maxWidth: '900px', margin: '0 auto', lineHeight: 1.1, color: '#fff' }}>
            Design that makes an office feel like a decision, not a default.
          </h2>
          <p style={{ marginTop: '32px', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '32px auto 0', fontSize: '18px', lineHeight: 1.6 }}>
            Explore our portfolio of premium workspace transformations, beautifully crafted to inspire productivity and elevate your brand presence.
          </p>
        </div>
      </div>

      {/* Graphic Masonry Gallery */}
      <div className="interior-masonry">
        {mixedItems.map((item, i) => {
          if (item.type === 'quote') {
            return (
              <div key={`quote-${i}`} className="interior-quote">
                <h3>{item.text}</h3>
                <p>{item.author}</p>
              </div>
            );
          }
          
          if (item.type === 'video') {
            return (
              <div key={`vid-${i}`} className="interior-item" onClick={() => openLightbox(item.path)}>
                <video src={item.path} autoPlay loop muted playsInline />
              </div>
            );
          }

          return (
            <div key={`img-${i}`} className="interior-item" onClick={() => openLightbox(item.path)}>
              <img src={item.path} alt={`Interior design ${i}`} loading="lazy" />
            </div>
          );
        })}
      </div>

      {/* Lightbox for zooming */}
      {lightboxIndex !== null && (
        <div className="mc-lightbox" onClick={() => setLightboxIndex(null)}>
          <button className="mc-close-btn" onClick={() => setLightboxIndex(null)}>✕</button>
          <button className="mc-lightbox-nav prev" onClick={handlePrevZoom}>‹</button>
          
          <div onClick={(e) => e.stopPropagation()}>
            {interiorAssets[lightboxIndex].type === 'video' ? (
              <video 
                src={interiorAssets[lightboxIndex].path} 
                className="mc-lightbox-content"
                controls 
                autoPlay 
              />
            ) : (
              <img 
                src={interiorAssets[lightboxIndex].path} 
                alt="Zoomed interior" 
                className="mc-lightbox-content"
              />
            )}
          </div>
          
          <button className="mc-lightbox-nav next" onClick={handleNextZoom}>›</button>
          <div className="mc-lightbox-count">
            {lightboxIndex + 1} / {interiorAssets.length}
          </div>
        </div>
      )}

      {/* Graphic Timeline Process Section */}
      <section className="process-section">
        <div className="section-head" style={{ justifyContent: 'center', textAlign: 'center', borderBottom: 'none' }}>
          <h2 style={{ margin: '0 auto' }}>Our Fit-out Process</h2>
          <p style={{ marginTop: '16px', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '16px auto 0' }}>
            A seamless, transparent approach to transforming your workspace from concept to completion.
          </p>
        </div>
        
        <div className="timeline-container">
          {processSteps.map((step, i) => (
            <div key={i} className="timeline-step">
              <div className="timeline-node">{`0${i + 1}`}</div>
              <div className="timeline-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="cta-strip" style={{ marginTop: 0 }}>
        <h3>Ready to transform your workspace?</h3>
        <button className="btn-brass">Request a Fit-out Quote →</button>
      </div>
    </>
  );
}
