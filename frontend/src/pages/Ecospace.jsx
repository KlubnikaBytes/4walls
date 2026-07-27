import React, { useState } from 'react';
import { ecospaceOptions } from '../utils/ecospaceData';

export default function Ecospace() {
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [zoomedIndex, setZoomedIndex] = useState(null);

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
    return <img src={src} alt={alt} {...props} />;
  };

  return (
    <div className="mc-page">
      <div className="section-head" style={{ padding: '64px 24px 24px', maxWidth: '1400px', margin: '0 auto' }}>
        <h2>Ecospace Office Details</h2>
        <p>Explore premium commercial spaces in New Town's most iconic IT park. Select a property below to view detailed amenities and photos.</p>
      </div>

      <div className="mc-grid">
        {ecospaceOptions.map((opt) => (
          <div 
            className="mc-card hover-card" 
            key={opt.id}
            onClick={() => setSelectedOpt(opt)}
          >
            <div className="mc-card-thumb">
              {/* Show the first image as the thumbnail */}
              {renderMedia(`/ecospace/${opt.folder}/${opt.images[0]}`, opt.name, {})}
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
        ))}
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

              <h4 className="mc-gallery-title">Property Gallery</h4>
              <div className="mc-gallery">
                {selectedOpt.images.map((img, idx) => (
                  renderMedia(`/ecospace/${selectedOpt.folder}/${img}`, `${selectedOpt.name} - ${idx}`, {
                    key: idx,
                    onClick: () => setZoomedIndex(idx)
                  })
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
          
          {selectedOpt.images[zoomedIndex].endsWith('.mp4') ? (
            <video 
              src={`/ecospace/${selectedOpt.folder}/${selectedOpt.images[zoomedIndex]}`} 
              controls 
              autoPlay 
              style={{ maxHeight: '90vh', maxWidth: '90vw' }} 
              onClick={(e) => e.stopPropagation()} 
            />
          ) : (
            <img 
              src={`/ecospace/${selectedOpt.folder}/${selectedOpt.images[zoomedIndex]}`} 
              alt="Zoomed view" 
              onClick={(e) => e.stopPropagation()} 
            />
          )}
          
          <button className="mc-lightbox-nav next" onClick={handleNextZoom}>›</button>
          
          <div className="mc-lightbox-count">
            {zoomedIndex + 1} / {selectedOpt.images.length}
          </div>
        </div>
      )}
    </div>
  );
}
