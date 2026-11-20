import React, { useState, useEffect, useCallback } from 'react';
import { ecospaceOptions } from '../utils/ecospaceData';
import { fetchBuildingPropertiesApi, resolveMediaUrl } from '../utils/api';
import { useWebSocket } from '../utils/useWebSocket';

export default function Ecospace() {
  const [options, setOptions] = useState(ecospaceOptions);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [zoomedIndex, setZoomedIndex] = useState(null);

  // Load properties from backend
  const loadProperties = useCallback(async () => {
    try {
      const res = await fetchBuildingPropertiesApi('Ecospace');
      if (res.items && res.items.length > 0) {
        setOptions(res.items);
      }
    } catch (err) {
      console.log('Using static Ecospace data fallback');
    }
  }, []);

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  // WebSocket listener
  const handleWs = useCallback((msg) => {
    if (msg.type === 'PROPERTIES_UPDATED') {
      const items = msg.payload?.properties?.['Ecospace'];
      if (items) {
        setOptions(items);
      }
    }
  }, []);

  useWebSocket(handleWs);

  const getMediaSrc = (folder, img) => {
    if (!img) return '/hero.png';
    if (img.startsWith('/') || img.startsWith('http')) return resolveMediaUrl(img);
    return `/ecospace/${folder}/${img}`;
  };

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
    return <img src={src} alt={alt} onError={(e) => { e.target.src = '/hero.png'; }} {...props} />;
  };

  return (
    <div className="mc-page">
      <div className="section-head" style={{ padding: '64px 24px 24px', maxWidth: '1400px', margin: '0 auto' }}>
        <h2>Ecospace Office Details</h2>
        <p>Explore premium commercial spaces in New Town's most iconic IT park. Select a property below to view detailed amenities and photos.</p>
      </div>

      <div className="mc-grid">
        {options.map((opt) => {
          const firstImg = opt.images?.[0] || '1.jpg';
          return (
            <div 
              className="mc-card hover-card" 
              key={opt.id}
              onClick={() => setSelectedOpt(opt)}
            >
              <div className="mc-card-thumb">
                {renderMedia(getMediaSrc(opt.folder, firstImg), opt.name, {})}
                <div className="mc-card-tag">{opt.size}</div>
              </div>
              <div className="mc-card-body">
                <h3 className="opt-title">{opt.name}</h3>
                <p className="opt-price">{opt.rent} / month</p>
                <div className="opt-quick-meta">
                  <span>{opt.workstation} Workstations</span> • <span>{opt.cabin} Cabins</span>
                </div>
                <button className="mc-btn-view">View Details</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Property Details Modal */}
      {selectedOpt && (
        <div className="mc-modal-overlay" onClick={() => setSelectedOpt(null)}>
          <div className="mc-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="mc-close-btn" onClick={() => setSelectedOpt(null)}>✕</button>
            
            <div className="mc-modal-header">
              <h2>{selectedOpt.name}</h2>
              <div className="opt-price-large">{selectedOpt.rent} / month</div>
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
                    {renderMedia(getMediaSrc(selectedOpt.folder, img), `${selectedOpt.name} - ${idx}`, {})}
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
            {renderMedia(getMediaSrc(selectedOpt.folder, selectedOpt.images[zoomedIndex]), "Zoomed view", { style: { maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain' } })}
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
