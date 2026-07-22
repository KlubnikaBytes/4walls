import React, { useState } from 'react';
import { maniCasadonaOptions } from '../utils/maniCasadonaData';

export default function ManiCasadona() {
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

  return (
    <div className="mc-page">
      <div className="section-head" style={{ padding: '64px 48px 24px', maxWidth: '1400px', margin: '0 auto' }}>
        <h2>Mani Casadona Office Details</h2>
        <p>Explore premium commercial spaces in New Town's most iconic IT park. Select a property below to view detailed amenities and photos.</p>
      </div>

      <div className="mc-grid">
        {maniCasadonaOptions.map((opt) => (
          <div 
            className="mc-card hover-card" 
            key={opt.id}
            onClick={() => setSelectedOpt(opt)}
          >
            <div className="mc-card-thumb">
              {/* Show the first image as the thumbnail */}
              <img src={`/manicasadona/${opt.folder}/${opt.images[0]}`} alt={opt.name} />
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
                  <img 
                    key={idx} 
                    src={`/manicasadona/${selectedOpt.folder}/${img}`} 
                    alt={`${selectedOpt.name} - ${idx}`}
                    onClick={() => setZoomedIndex(idx)}
                  />
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
          
          <img 
            src={`/manicasadona/${selectedOpt.folder}/${selectedOpt.images[zoomedIndex]}`} 
            alt="Zoomed view" 
            onClick={(e) => e.stopPropagation()} 
          />
          
          <button className="mc-lightbox-nav next" onClick={handleNextZoom}>›</button>
          
          <div className="mc-lightbox-count">
            {zoomedIndex + 1} / {selectedOpt.images.length}
          </div>
        </div>
      )}
    </div>
  );
}
