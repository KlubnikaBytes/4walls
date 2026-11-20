import React, { useState, useEffect, useCallback } from 'react';
import { maniCasadonaOptions } from '../utils/maniCasadonaData';
import { ecospaceOptions } from '../utils/ecospaceData';
import { fetchPropertiesApi, resolveMediaUrl } from '../utils/api';
import { useWebSocket } from '../utils/useWebSocket';

export default function Properties() {
  const initialProperties = [
    ...maniCasadonaOptions.map(p => ({ ...p, building: "Mani Casadona", imageFolder: "/manicasadona" })),
    ...ecospaceOptions.map(p => ({ ...p, building: "Ecospace", imageFolder: "/ecospace" }))
  ];

  const [allProperties, setAllProperties] = useState(initialProperties);
  const [activeBuilding, setActiveBuilding] = useState('All');
  const [activeSize, setActiveSize] = useState('All');
  
  // Mobile Filter State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Modal State
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [zoomedIndex, setZoomedIndex] = useState(null);

  // Load properties dynamically
  const loadProperties = useCallback(async () => {
    try {
      const res = await fetchPropertiesApi();
      if (res.data && res.data.properties) {
        const combined = [];
        Object.keys(res.data.properties).forEach(bldg => {
          const folderPrefix = bldg === 'Mani Casadona' ? '/manicasadona' : bldg === 'Ecospace' ? '/ecospace' : '/uploads';
          (res.data.properties[bldg] || []).forEach(p => {
            combined.push({
              ...p,
              building: bldg,
              imageFolder: folderPrefix
            });
          });
        });
        if (combined.length > 0) {
          setAllProperties(combined);
        }
      }
    } catch (err) {
      console.log('Using static properties fallback');
    }
  }, []);

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  // WebSocket live updates
  const handleWs = useCallback((msg) => {
    if (msg.type === 'PROPERTIES_UPDATED') {
      const combined = [];
      Object.keys(msg.payload.properties || {}).forEach(bldg => {
        const folderPrefix = bldg === 'Mani Casadona' ? '/manicasadona' : bldg === 'Ecospace' ? '/ecospace' : '/uploads';
        (msg.payload.properties[bldg] || []).forEach(p => {
          combined.push({
            ...p,
            building: bldg,
            imageFolder: folderPrefix
          });
        });
      });
      if (combined.length > 0) {
        setAllProperties(combined);
      }
    }
  }, []);

  useWebSocket(handleWs);

  const getMediaUrl = (prop, imgName) => {
    if (!imgName) return '/hero.png';
    if (imgName.startsWith('/') || imgName.startsWith('http')) return resolveMediaUrl(imgName);
    return `${prop.imageFolder}/${prop.folder}/${imgName}`;
  };

  const buildingOptions = ['All', ...Array.from(new Set(allProperties.map(p => p.building)))];

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
    return <img src={src} alt={alt} onError={(e) => { e.target.src = '/hero.png'; }} {...props} style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', ...props.style }} />;
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
            background: #1a2220;
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
            z-index: 1998;
            box-shadow: 0 8px 24px rgba(31, 149, 164, 0.4);
            align-items: center;
            gap: 8px;
            cursor: pointer;
          }
        }
      `}</style>

      {/* Header section */}
      <section style={{ paddingTop: '64px', paddingBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
          <div className="eyebrow" style={{ color: 'var(--brass)', borderColor: 'rgba(31, 149, 164, 0.4)' }}>Property Catalog</div>
          <h2 style={{ fontSize: '42px', maxWidth: '800px', lineHeight: 1.1, color: '#fff', marginTop: '16px' }}>
            Find the right commercial space for your enterprise.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '600px', marginTop: '16px', fontSize: '16px' }}>
            Explore verified office spaces across New Town and Sector V with real-time availability.
          </p>
        </div>
      </section>

      {/* Main content with sidebar and listings */}
      <div className="prop-layout">
        
        {/* Mobile Overlay */}
        <div 
          className={`mobile-filter-overlay ${isMobileFilterOpen ? 'open' : ''}`}
          onClick={() => setIsMobileFilterOpen(false)}
        />

        {/* Sidebar Filter */}
        <div className={`prop-sidebar ${isMobileFilterOpen ? 'open' : ''}`}>
          
          {/* Close button for mobile sheet */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '18px', color: '#fff', margin: 0 }}>Filters</h3>
            <button 
              onClick={() => setIsMobileFilterOpen(false)}
              style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: '24px', cursor: 'pointer', display: isMobileFilterOpen ? 'block' : 'none' }}
            >✕</button>
          </div>

          <div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--brass)', marginBottom: '16px', fontWeight: 600 }}>
              Building / Complex
            </div>
            <div className="filter-group-buttons">
              {buildingOptions.map(bldg => (
                <button
                  key={bldg}
                  className={`filter-btn ${activeBuilding === bldg ? 'active' : ''}`}
                  onClick={() => setActiveBuilding(bldg)}
                >
                  {bldg}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--brass)', marginBottom: '16px', fontWeight: 600 }}>
              Floor Area (sq.ft)
            </div>
            <div className="filter-group-buttons">
              {['All', '< 2000 sq.ft', '> 2000 sq.ft'].map(size => (
                <button
                  key={size}
                  className={`filter-btn ${activeSize === size ? 'active' : ''}`}
                  onClick={() => setActiveSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Direct trigger to close filters on mobile */}
          <button 
            className="btn-brass" 
            style={{ width: '100%', marginTop: '16px', display: isMobileFilterOpen ? 'block' : 'none' }}
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
                  {renderMedia(getMediaUrl(p, p.images?.[0] || '1.jpg'), p.name, { style: { width: '100%', height: '100%', objectFit: 'cover' } })}
                  <span style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '4px 12px', borderRadius: '4px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', border: '1px solid rgba(255,255,255,0.2)' }}>
                    {p.building}
                  </span>
                </div>
                
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '22px', marginBottom: '4px', color: '#fff' }}>{p.name}</h3>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '12px' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px', verticalAlign: 'text-bottom' }}>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    New Town, Kolkata
                  </div>

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

              <h4 className="mc-gallery-title">Property Gallery ({selectedOpt.images?.length || 0})</h4>
              <div className="mc-gallery">
                {(selectedOpt.images || []).map((img, idx) => (
                  <div key={idx} className="mc-gallery-item" onClick={() => setZoomedIndex(idx)}>
                    {renderMedia(getMediaUrl(selectedOpt, img), `${selectedOpt.name} - ${idx}`, {})}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox for Zoomed Image with Slider */}
      {zoomedIndex !== null && selectedOpt && (
        <div className="mc-lightbox" onClick={() => setZoomedIndex(null)}>
          <button className="mc-close-btn light" onClick={() => setZoomedIndex(null)}>✕</button>
          
          <button className="mc-lightbox-nav prev" onClick={handlePrevZoom}>‹</button>
          
          <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: '90%', maxHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {renderMedia(getMediaUrl(selectedOpt, selectedOpt.images[zoomedIndex]), "Zoomed view", { style: { maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain' } })}
          </div>
          
          <button className="mc-lightbox-nav next" onClick={handleNextZoom}>›</button>
          
          <div className="mc-lightbox-count">
            {zoomedIndex + 1} / {selectedOpt.images.length}
          </div>
        </div>
      )}
    </div>
  );
}
