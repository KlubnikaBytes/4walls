import React, { useState, useEffect } from 'react';
import { maniCasadonaOptions } from '../utils/maniCasadonaData';
import { ecospaceOptions } from '../utils/ecospaceData';

export default function Properties() {
  const allProperties = [
    ...maniCasadonaOptions.map(p => ({ ...p, building: "Mani Casadona", imageFolder: "/manicasadona" })),
    ...ecospaceOptions.map(p => ({ ...p, building: "Ecospace", imageFolder: "/ecospace" }))
  ];

  const [activeBuilding, setActiveBuilding] = useState('All');
  const [activeSize, setActiveSize] = useState('All');
  
  // Mobile Filter State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Modal State
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [zoomedIndex, setZoomedIndex] = useState(null);

  const filteredList = allProperties.filter(p => {
    let matchBuilding = true;
    let matchSize = true;

    if (activeBuilding !== 'All') {
      matchBuilding = p.building === activeBuilding;
    }

    if (activeSize !== 'All') {
      const sqft = parseInt(p.size.replace(/[^0-9]/g, ''), 10);
      if (activeSize === '< 2000 sq.ft') matchSize = sqft < 2000;
      if (activeSize === '> 2000 sq.ft') matchSize = sqft >= 2000;
    }

    return matchBuilding && matchSize;
  });

  const handleNextZoom = (e) => {
    e.stopPropagation();
    if (selectedOpt && zoomedIndex !== null) {
      setZoomedIndex((zoomedIndex + 1) % selectedOpt.images.length);
    }
  };

  const handlePrevZoom = (e) => {
    e.stopPropagation();
    if (selectedOpt && zoomedIndex !== null) {
      setZoomedIndex((zoomedIndex - 1 + selectedOpt.images.length) % selectedOpt.images.length);
    }
  };

  const renderMedia = (src, alt, props) => {
    if (src.endsWith('.mp4')) {
      return (
        <video 
          src={src} 
          autoPlay 
          muted 
          loop 
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
          {...props} 
        />
      );
    }
    return <img src={src} alt={alt} {...props} style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', ...props.style }} />;
  };

  // Prevent scrolling when mobile filter is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileFilterOpen]);

  return (
    <div style={{ background: 'var(--ink)', minHeight: '100vh', paddingBottom: '80px', color: '#fff', position: 'relative' }}>
      <style>{`
        .prop-layout {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 48px;
          max-width: 1400px;
          margin: 40px auto 0;
          padding: 0 24px;
        }
        .prop-sidebar {
          position: sticky;
          top: 100px;
          align-self: start;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        .filter-group-buttons {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .filter-btn {
          background: transparent;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.2);
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }
        .filter-btn:hover {
          background: rgba(255,255,255,0.05);
        }
        .filter-btn.active {
          background: var(--brass);
          color: var(--ink);
          border-color: var(--brass);
          font-weight: 500;
        }
        
        /* Mobile Specific Styles */
        .mobile-filter-trigger {
          display: none;
        }
        .mobile-filter-overlay {
          display: none;
        }
        
        @media (max-width: 768px) {
          .prop-layout {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          
          /* Turn Sidebar into a Bottom Sheet */
          .prop-sidebar {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            top: auto;
            background: #1a2220; /* Slightly lighter than var(--ink) */
            z-index: 2000;
            padding: 32px 24px 48px;
            border-top: 1px solid rgba(255,255,255,0.1);
            border-radius: 24px 24px 0 0;
            transform: translateY(100%);
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 -10px 40px rgba(0,0,0,0.5);
            max-height: 80vh;
            overflow-y: auto;
            gap: 32px;
          }
          .prop-sidebar.open {
            transform: translateY(0);
          }
          
          .mobile-filter-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.6);
            backdrop-filter: blur(4px);
            z-index: 1999;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
          }
          .mobile-filter-overlay.open {
            opacity: 1;
            pointer-events: auto;
          }

          .filter-group-buttons {
            flex-direction: row;
            flex-wrap: wrap;
          }
          
          /* Fixed Bottom Filter Trigger */
          .mobile-filter-trigger {
            display: flex;
            position: fixed;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--brass);
            color: var(--ink);
            border: none;
            padding: 14px 32px;
            border-radius: 40px;
            font-size: 15px;
            font-weight: 600;
            z-index: 1998; /* Below overlay */
            box-shadow: 0 8px 24px rgba(169, 125, 47, 0.4);
            align-items: center;
            gap: 8px;
            cursor: pointer;
          }
        }
      `}</style>
      
      {/* Premium Header */}
      <section style={{ paddingTop: '80px', paddingBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
          <div className="eyebrow" style={{ color: 'var(--brass)', borderColor: 'rgba(169, 125, 47, 0.4)' }}>Property Portfolio</div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', maxWidth: '800px', lineHeight: 1.1, color: '#fff', marginTop: '16px' }}>Discover Your Next Workspace.</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '600px', marginTop: '24px', fontSize: '18px' }}>
            Explore premium commercial properties across Kolkata's top IT hubs. View detailed amenities, workstation capacities, and high-res galleries.
          </p>
        </div>
      </section>

      {/* Main Layout with Sidebar */}
      <div className="prop-layout">
        
        {/* Mobile Filter Overlay */}
        <div 
          className={`mobile-filter-overlay ${isMobileFilterOpen ? 'open' : ''}`} 
          onClick={() => setIsMobileFilterOpen(false)}
        />

        {/* Sidebar Filters (Bottom Sheet on Mobile) */}
        <div className={`prop-sidebar ${isMobileFilterOpen ? 'open' : ''}`}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="mobile-only-header">
            <h3 style={{ fontSize: '20px', margin: 0 }}>Filters</h3>
            {/* Close button only visible on mobile, achievable via media queries or just inline style since it's inside the sheet */}
            <button 
              onClick={() => setIsMobileFilterOpen(false)}
              style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer', display: window.innerWidth <= 768 ? 'block' : 'none' }}
            >✕</button>
          </div>

          <div>
            <h4 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.5)', marginBottom: '16px' }}>Building</h4>
            <div className="filter-group-buttons">
              {['All', 'Mani Casadona', 'Ecospace'].map(b => (
                <button 
                  key={b}
                  onClick={() => {
                    setActiveBuilding(b);
                    // Don't auto-close on selection to allow multiple changes
                  }}
                  className={`filter-btn ${activeBuilding === b ? 'active' : ''}`}
                >{b === 'All' ? 'All Buildings' : b}</button>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.5)', marginBottom: '16px' }}>Size</h4>
            <div className="filter-group-buttons">
              {['All', '< 2000 sq.ft', '> 2000 sq.ft'].map(s => (
                <button 
                  key={s}
                  onClick={() => setActiveSize(s)}
                  className={`filter-btn ${activeSize === s ? 'active' : ''}`}
                >{s === 'All' ? 'All Sizes' : s}</button>
              ))}
            </div>
          </div>
          
          {/* Apply button for mobile */}
          <button 
            className="btn-brass" 
            style={{ width: '100%', marginTop: '16px', display: window.innerWidth <= 768 ? 'block' : 'none' }}
            onClick={() => setIsMobileFilterOpen(false)}
          >Show {filteredList.length} Properties</button>
        </div>

        {/* Mobile Filter Trigger Button (FAB) */}
        <button 
          className="mobile-filter-trigger" 
          onClick={() => setIsMobileFilterOpen(true)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          Filters
        </button>

        {/* Grid of properties */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
              Showing {filteredList.length} properties
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
            {filteredList.map((p, i) => (
              <div 
                key={i} 
                style={{ 
                  background: 'rgba(255,255,255,0.03)', 
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.5)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                onClick={() => setSelectedOpt(p)}
              >
                <div style={{ height: '240px', position: 'relative' }}>
                  {renderMedia(`${p.imageFolder}/${p.folder}/${p.images[0]}`, p.name, { style: { width: '100%', height: '100%', objectFit: 'cover' } })}
                  <span style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '4px 12px', borderRadius: '4px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', border: '1px solid rgba(255,255,255,0.2)' }}>
                    {p.building}
                  </span>
                </div>
                
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '22px', marginBottom: '8px', color: '#fff' }}>{p.name}</h3>
                  <div style={{ fontSize: '18px', color: 'var(--brass)', marginBottom: '20px' }}>{p.rent} <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>/ month</span></div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
                    <div><div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', marginBottom: '4px' }}>Area</div><div style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{p.size}</div></div>
                    <div><div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', marginBottom: '4px' }}>Workstations</div><div style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{p.workstation}</div></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Property Details Modal */}
      {selectedOpt && (
        <div className="mc-modal-overlay" onClick={() => setSelectedOpt(null)} style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}>
          <div className="mc-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="mc-close-btn" onClick={() => setSelectedOpt(null)}>✕</button>
            
            <div className="mc-modal-header">
              <h2>{selectedOpt.name}</h2>
              <div className="opt-price-large">{selectedOpt.rent} / month</div>
              <div style={{ fontSize: '13px', color: 'var(--ink-soft)', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Building: {selectedOpt.building}</div>
            </div>

            <div className="mc-modal-body">
              <div className="mc-details-grid">
                <div className="mc-detail-item">
                  <span className="lbl">Size</span>
                  <span className="val">{selectedOpt.size}</span>
                </div>
                <div className="mc-detail-item">
                  <span className="lbl">Workstations</span>
                  <span className="val">{selectedOpt.workstation}</span>
                </div>
                <div className="mc-detail-item">
                  <span className="lbl">Cabins</span>
                  <span className="val">{selectedOpt.cabin}</span>
                </div>
                <div className="mc-detail-item">
                  <span className="lbl">Conference Room</span>
                  <span className="val">{selectedOpt.conferenceRoom}</span>
                </div>
                <div className="mc-detail-item">
                  <span className="lbl">Reception</span>
                  <span className="val">{selectedOpt.reception}</span>
                </div>
                <div className="mc-detail-item">
                  <span className="lbl">Pantry</span>
                  <span className="val">{selectedOpt.pantry}</span>
                </div>
                <div className="mc-detail-item">
                  <span className="lbl">Car Parking</span>
                  <span className="val">{selectedOpt.carParking}</span>
                </div>
              </div>

              <h4 className="mc-gallery-title">Property Gallery</h4>
              <div className="mc-gallery">
                {selectedOpt.images.map((img, idx) => (
                  renderMedia(`${selectedOpt.imageFolder}/${selectedOpt.folder}/${img}`, `${selectedOpt.name} - ${idx}`, {
                    key: idx,
                    onClick: () => setZoomedIndex(idx),
                    style: { cursor: 'zoom-in', borderRadius: '8px', border: '1px solid var(--line)' }
                  })
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox for Zoomed Image with Slider */}
      {zoomedIndex !== null && selectedOpt && (
        <div className="mc-lightbox" onClick={() => setZoomedIndex(null)} style={{ zIndex: 9999 }}>
          <button className="mc-close-btn light" onClick={() => setZoomedIndex(null)} style={{ color: '#fff' }}>✕</button>
          
          <button className="mc-lightbox-nav prev" onClick={handlePrevZoom}>‹</button>
          
          {selectedOpt.images[zoomedIndex].endsWith('.mp4') ? (
            <video 
              src={`${selectedOpt.imageFolder}/${selectedOpt.folder}/${selectedOpt.images[zoomedIndex]}`} 
              controls 
              autoPlay 
              style={{ maxHeight: '90vh', maxWidth: '90vw' }} 
              onClick={(e) => e.stopPropagation()} 
            />
          ) : (
            <img 
              src={`${selectedOpt.imageFolder}/${selectedOpt.folder}/${selectedOpt.images[zoomedIndex]}`} 
              alt="Zoomed view" 
              onClick={(e) => e.stopPropagation()} 
              style={{ maxHeight: '90vh', maxWidth: '90vw', objectFit: 'contain' }}
            />
          )}
          
          <button className="mc-lightbox-nav next" onClick={handleNextZoom}>›</button>
          
          <div className="mc-lightbox-count" style={{ color: '#fff' }}>
            {zoomedIndex + 1} / {selectedOpt.images.length}
          </div>
        </div>
      )}
    </div>
  );
}
