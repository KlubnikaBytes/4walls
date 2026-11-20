import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { maniCasadonaOptions } from '../utils/maniCasadonaData';
import { ecospaceOptions } from '../utils/ecospaceData';
import { fetchPropertiesApi, resolveMediaUrl } from '../utils/api';
import { useWebSocket } from '../utils/useWebSocket';

export default function Investment() {
  const initialProperties = [
    ...maniCasadonaOptions.map(p => ({ ...p, building: "Mani Casadona", buildingPath: "/mani-casadona", imageFolder: "/manicasadona", yield: "7.8%" })),
    ...ecospaceOptions.map(p => ({ ...p, building: "Ecospace", buildingPath: "/ecospace", imageFolder: "/ecospace", yield: "8.2%" }))
  ];

  const [allProperties, setAllProperties] = useState(initialProperties);

  const loadProperties = useCallback(async () => {
    try {
      const res = await fetchPropertiesApi();
      if (res.data && res.data.properties) {
        const combined = [];
        Object.keys(res.data.properties).forEach(bldg => {
          const folderPrefix = bldg === 'Mani Casadona' ? '/manicasadona' : bldg === 'Ecospace' ? '/ecospace' : '/uploads';
          const path = bldg === 'Mani Casadona' ? '/mani-casadona' : bldg === 'Ecospace' ? '/ecospace' : '/properties';
          (res.data.properties[bldg] || []).forEach((p, idx) => {
            combined.push({
              ...p,
              building: bldg,
              buildingPath: path,
              imageFolder: folderPrefix,
              yield: idx % 2 === 0 ? '7.8%' : '8.2%'
            });
          });
        });
        if (combined.length > 0) {
          setAllProperties(combined);
        }
      }
    } catch (e) {
      console.log('Using static investment fallback');
    }
  }, []);

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  const handleWs = useCallback((msg) => {
    if (msg.type === 'PROPERTIES_UPDATED') {
      const combined = [];
      Object.keys(msg.payload.properties || {}).forEach(bldg => {
        const folderPrefix = bldg === 'Mani Casadona' ? '/manicasadona' : bldg === 'Ecospace' ? '/ecospace' : '/uploads';
        const path = bldg === 'Mani Casadona' ? '/mani-casadona' : bldg === 'Ecospace' ? '/ecospace' : '/properties';
        (msg.payload.properties[bldg] || []).forEach((p, idx) => {
          combined.push({
            ...p,
            building: bldg,
            buildingPath: path,
            imageFolder: folderPrefix,
            yield: idx % 2 === 0 ? '7.8%' : '8.2%'
          });
        });
      });
      if (combined.length > 0) {
        setAllProperties(combined);
      }
    }
  }, []);

  useWebSocket(handleWs);

  const getMediaUrl = (p, imgName) => {
    if (!imgName) return '/hero.png';
    if (imgName.startsWith('/') || imgName.startsWith('http')) return resolveMediaUrl(imgName);
    return `${p.imageFolder}/${p.folder}/${imgName}`;
  };

  return (
    <div style={{ background: 'var(--ink)', color: 'var(--white)', minHeight: '100vh', paddingBottom: '80px' }}>
      <section style={{ paddingTop: '80px', paddingBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="eyebrow" style={{ color: 'var(--brass)', borderColor: 'rgba(31, 149, 164, 0.4)' }}>Commercial Office Investment</div>
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
                backgroundImage: `url('${getMediaUrl(p, p.images?.[0] || '1.jpg')}')`, 
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
                  <span className="btn-brass" style={{ padding: '8px 16px', fontSize: '13px' }}>View Details →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
