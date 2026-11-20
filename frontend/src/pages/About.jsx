import React, { useState, useEffect, useCallback } from 'react';
import { fetchAboutApi, resolveMediaUrl } from '../utils/api';
import { useWebSocket } from '../utils/useWebSocket';

const defaultAbout = {
  heading: "We don't just broker properties—we build lasting value through expertise, integrity, and execution.",
  p1: "Founded with the vision to simplify commercial real estate in Kolkata. We provide end-to-end solutions from finding the right bare shell space to designing and delivering a fully functional, inspiring workplace for your team.",
  p2: "Together with a dedicated team, 4Walls Property Solutions delivers trusted expertise in commercial leasing, sales, investments, interiors, and asset management.",
  leaders: [
    {
      id: 1,
      name: "Nitin Baheti",
      role: "Managing Director | 4Walls Property Solutions",
      image: "/team/nitin.jpg",
      bio: "With over 20 years of experience in commercial real estate, Nitin Baheti founded 4Walls Property Solutions to provide end-to-end commercial real estate solutions. He has successfully developed 10+ commercial office assets and advised clients on the leasing, sale, investment, and management of 100+ commercial properties, with expertise in commercial interiors and workspace planning. He is also passionate about interior designing and workspace aesthetics."
    },
    {
      id: 2,
      name: "Sneha Baheti",
      role: "Director | 4Walls Property Solutions",
      image: "/team/sneha.jpg",
      bio: "With over 15 years of experience at TCS, ICICI Bank, and other leading organisations, Sneha Baheti leads business operations and client relationships at 4Walls. Her focus on operational excellence and customer experience ensures seamless delivery across every project."
    }
  ]
};

export default function About() {
  const [aboutData, setAboutData] = useState(defaultAbout);

  const loadAbout = useCallback(async () => {
    try {
      const res = await fetchAboutApi();
      if (res.data) {
        setAboutData(res.data);
      }
    } catch (err) {
      console.log('Using default about content fallback');
    }
  }, []);

  useEffect(() => {
    loadAbout();
  }, [loadAbout]);

  const handleWs = useCallback((msg) => {
    if (msg.type === 'ABOUT_UPDATED' && msg.payload) {
      setAboutData(msg.payload);
    }
  }, []);

  useWebSocket(handleWs);

  return (
    <>
      <section className="py-xlarge">
        <div className="eyebrow">About Us</div>
        <h2 style={{ fontSize: '42px', maxWidth: '800px', marginBottom: '24px' }}>
          {aboutData.heading}
        </h2>
        <div className="split" style={{ alignItems: 'flex-start', marginTop: '48px' }}>
          <p style={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--ink-soft)', maxWidth: 'none', margin: 0 }}>
            {aboutData.p1}
          </p>
          <p style={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--ink-soft)', maxWidth: 'none', margin: 0 }}>
            {aboutData.p2}
          </p>
        </div>
      </section>

      <section className="py-xlarge" style={{ backgroundColor: 'var(--white)' }}>
        <div className="eyebrow">Leadership</div>
        <h2 style={{ fontSize: '34px', marginBottom: '48px' }}>Meet Our Leaders</h2>
        
        <div className="split" style={{ alignItems: 'stretch', gap: '24px' }}>
          {(aboutData.leaders || []).map((leader) => (
            <div 
              key={leader.id} 
              className="hover-card" 
              style={{ background: 'var(--paper)', padding: '40px', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column' }}
            >
              <img 
                src={resolveMediaUrl(leader.image)} 
                alt={leader.name} 
                onError={(e) => { e.target.src = '/hero.png'; }}
                style={{ width: '100%', height: '360px', objectFit: 'cover', marginBottom: '24px', borderRadius: '4px' }} 
              />
              <h3 style={{ fontFamily: 'Fraunces', fontSize: '26px', marginBottom: '4px' }}>{leader.name}</h3>
              <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '11px', color: 'var(--brass)', marginBottom: '24px', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {leader.role}
              </div>
              <p style={{ fontSize: '14.5px', lineHeight: 1.65, color: 'var(--ink-soft)', margin: 0 }}>
                {leader.bio}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
