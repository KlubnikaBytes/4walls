import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function KnowledgeCentre() {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const blogs = [
    { cat: 'Leasing', title: 'How to lease your first commercial office in Kolkata', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&h=400&q=80' },
    { cat: 'Legal', title: 'GST on commercial property, explained simply', img: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&h=400&q=80' },
    { cat: 'Legal', title: 'The ultimate commercial rental agreement guide', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=400&q=80' },
    { cat: 'Market', title: 'Sector V vs New Town: where should you lease in 2026?', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&h=400&q=80' },
    { cat: 'Market', title: 'Understanding rental yields in premium IT parks', img: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=600&h=400&q=80' },
    { cat: 'Interior', title: 'Office interior costing: bare shell to move-in ready', img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=600&h=400&q=80' },
  ];

  const categories = ['All', 'Leasing', 'Investment', 'Legal', 'Interior', 'Market'];
  const [activeCat, setActiveCat] = useState('All');

  const filteredBlogs = activeCat === 'All' 
    ? blogs 
    : blogs.filter(b => b.cat === activeCat || (activeCat === 'Market Reports' && b.cat === 'Market'));

  return (
    <>
      <section style={{ paddingTop: '56px', paddingBottom: '36px' }}>
        <div className="eyebrow">Knowledge Centre</div>
        <h2 style={{ fontSize: '38px', maxWidth: '640px' }}>Guides for leasing, investing and building offices in Kolkata.</h2>
      </section>

      <div className="listing-shell">
        <div className="filter-col">
          <h4>Category</h4>
          {['All', 'Leasing', 'Investment', 'Legal', 'Interior', 'Market Reports'].map(cat => (
            <div 
              key={cat}
              className={`chip ${activeCat === cat ? 'on' : ''}`}
              onClick={() => setActiveCat(cat)}
            >
              {cat}
            </div>
          ))}
        </div>
        <div className="listing-main">
          
          <div className="art-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((b, i) => (
                <div 
                  key={i} 
                  className="card hover-card" 
                  onClick={() => setSelectedBlog(b)}
                  style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit', border: '1px solid var(--line)', background: 'var(--white)', borderRadius: '12px', overflow: 'hidden' }}
                >
                  <div style={{ height: '200px', backgroundImage: `url(${b.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                  <div style={{ padding: '24px' }}>
                    <span className="mono" style={{ fontSize: '11px', color: 'var(--brass)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', display: 'block' }}>{b.cat}</span>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, lineHeight: 1.4 }}>{b.title}</h3>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', color: 'var(--ink-soft)' }}>
                No articles found for this category.
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Modal for Details */}
      {selectedBlog && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '24px',
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={() => setSelectedBlog(null)}
        >
          <div 
            style={{
              background: 'var(--white, #fff)',
              borderRadius: '20px',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              animation: 'slideUp 0.3s ease-out'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={() => setSelectedBlog(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                lineHeight: 1,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                zIndex: 10,
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              &times;
            </button>

            {/* Header Image */}
            <div 
              style={{ 
                height: '350px',
                minHeight: '350px',
                backgroundImage: `url(${selectedBlog.img})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px',
                position: 'relative'
              }}
            >
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '50%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
                pointerEvents: 'none'
              }}></div>
            </div>

            {/* Content */}
            <div style={{ padding: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ 
                  padding: '6px 12px', 
                  background: 'var(--sand, #f4f4f4)', 
                  borderRadius: '20px',
                  fontSize: '12px', 
                  color: 'var(--brass, #b58500)', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em', 
                  fontWeight: '600' 
                }}>
                  {selectedBlog.cat}
                </span>
                <span style={{ fontSize: '13px', color: '#666' }}>5 min read</span>
              </div>
              
              <h2 style={{ fontSize: '32px', fontWeight: 700, lineHeight: 1.2, marginBottom: '24px', color: '#111' }}>
                {selectedBlog.title}
              </h2>
              
              <div style={{ fontSize: '17px', lineHeight: 1.7, color: '#444' }}>
                <p style={{ marginBottom: '20px', fontSize: '19px', color: '#222', lineHeight: 1.6 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                </p>
                <p style={{ marginBottom: '20px' }}>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <h4 style={{ fontSize: '22px', fontWeight: 600, color: '#111', marginTop: '32px', marginBottom: '16px' }}>
                  Key Takeaways
                </h4>
                <ul style={{ paddingLeft: '24px', marginBottom: '24px' }}>
                  <li style={{ marginBottom: '12px' }}>Understand the basic market dynamics and leasing terms in Kolkata.</li>
                  <li style={{ marginBottom: '12px' }}>Consult with a legal expert before finalizing the rental agreement.</li>
                  <li style={{ marginBottom: '12px' }}>Calculate the total cost of ownership including maintenance and GST.</li>
                </ul>
                <p>
                  Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.
                </p>
              </div>
            </div>
          </div>
          
          <style>
            {`
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              @keyframes slideUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}
          </style>
        </div>
      )}
    </>
  );
}
