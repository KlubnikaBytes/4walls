import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { maniCasadonaOptions } from '../utils/maniCasadonaData';
import { ecospaceOptions } from '../utils/ecospaceData';

export default function Investment() {
  const allProperties = [
    ...maniCasadonaOptions.map(p => ({ ...p, building: "Mani Casadona", buildingPath: "/mani-casadona", imageFolder: "/manicasadona", yield: "7.8%" })),
    ...ecospaceOptions.map(p => ({ ...p, building: "Ecospace", buildingPath: "/ecospace", imageFolder: "/ecospace", yield: "8.2%" }))
  ];

  return (
    <div style={{ background: 'var(--ink)', color: 'var(--white)', minHeight: '100vh', paddingBottom: '80px' }}>
      <section style={{ paddingTop: '80px', paddingBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="eyebrow" style={{ color: 'var(--brass)', borderColor: 'rgba(169, 125, 47, 0.4)' }}>Commercial Office Investment</div>
        <h2 style={{ fontSize: '48px', maxWidth: '800px', lineHeight: 1.1, color: '#fff', marginTop: '16px' }}>Own the space businesses actually need.</h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '600px', marginTop: '24px', fontSize: '18px' }}>
          Explore high-yield commercial assets across Kolkata's top IT hubs. Pre-leased and ready-to-fit options available for immediate ROI.
        </p>
      </section>

      <section style={{ paddingTop: '64px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '24px', color: '#fff' }}>Available Opportunities</h3>
          <div className="mono" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>{allProperties.length} Assets Found</div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {allProperties.map((p, i) => (
            <Link key={i} to={p.buildingPath} style={{ 
              display: 'grid', 
              gridTemplateColumns: '200px 1fr 200px', 
              gap: '32px', 
              background: 'rgba(255,255,255,0.03)', 
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              padding: '24px',
              textDecoration: 'none',
              color: 'inherit',
              alignItems: 'center',
              transition: 'background 0.2s ease, transform 0.2s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.transform = 'none'; }}
            >
              
              <div style={{ 
                width: '100%', 
                height: '140px', 
                borderRadius: '8px', 
                backgroundImage: `url('${p.imageFolder}/${p.folder}/${p.images[0]}')`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                boxShadow: '0 8px 20px rgba(0,0,0,0.4)'
              }}></div>
              
              <div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '11px', background: 'var(--brass)', color: 'var(--ink)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600, textTransform: 'uppercase' }}>{p.building}</span>
                  <span style={{ fontSize: '11px', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>{p.size}</span>
                </div>
                <h4 style={{ fontSize: '24px', marginBottom: '12px', color: '#fff' }}>{p.name}</h4>
                <div style={{ display: 'flex', gap: '24px', color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
                  <span><strong style={{ color: '#fff' }}>{p.workstation}</strong> Workstations</span>
                  <span><strong style={{ color: '#fff' }}>{p.cabin}</strong> Cabins</span>
                  <span><strong style={{ color: '#fff' }}>{p.conferenceRoom}</strong> Conference</span>
                </div>
              </div>

              <div style={{ textAlign: 'right', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '32px' }}>
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', letterSpacing: '1px', marginBottom: '4px' }}>Expected Yield</div>
                  <div style={{ fontSize: '32px', color: 'var(--brass)', fontWeight: 500 }}>{p.yield}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', letterSpacing: '1px', marginBottom: '4px' }}>Est. Rent</div>
                  <div style={{ fontSize: '16px', color: '#fff' }}>{p.rent}</div>
                </div>
              </div>

            </Link>
          ))}
        </div>
      </section>

      <section style={{ paddingTop: '64px', borderTop: 'none', paddingBottom: 0 }}>
        <div className="quote-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="quote" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <span className="eyebrow" style={{ marginBottom: '8px', color: 'var(--brass)', borderColor: 'rgba(169, 125, 47, 0.4)' }}>Case Study</span>
            <p style={{ color: '#fff' }}>"Helped a Sector V tenant scale from 2,000 to 5,000 sqft without breaking their lease terms, securing a 9% return for the new owner."</p>
            <div className="who" style={{ color: 'rgba(255,255,255,0.5)' }}>Problem → Solution → Result</div>
          </div>
          <div className="quote" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <span className="eyebrow" style={{ marginBottom: '8px', color: 'var(--brass)', borderColor: 'rgba(169, 125, 47, 0.4)' }}>Tool</span>
            <p style={{ color: '#fff' }}>Rental yield calculator — estimate returns on any commercial asset before you commit to the purchase.</p>
            <div className="who" style={{ color: 'rgba(255,255,255,0.5)' }}>Open calculator →</div>
          </div>
        </div>
      </section>
    </div>
  );
}
