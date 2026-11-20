import React, { useState, useEffect, useCallback } from 'react';
import { fetchBlogsApi, fetchCategoriesApi, resolveMediaUrl } from '../utils/api';
import { useWebSocket } from '../utils/useWebSocket';

const initialBlogs = [
  {
    id: 1,
    cat: 'Leasing',
    title: 'How to lease your first commercial office in Kolkata',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&h=400&q=80',
    excerpt: 'Essential checklist on lock-in periods, CAM charges, stamp duty, and location strategy in Kolkata commercial hubs.',
    content: 'Commercial leasing requires strategic evaluation of location, accessibility, statutory compliances, and rental costs. Whether looking at Salt Lake Sector V or New Town Action Area II, ensure thorough lease deed verification, lock-in period negotiation, clarity on common area maintenance (CAM) charges, and municipal occupancy certificates.',
    date: '2026-10-15',
    readTime: '5 min read',
    author: 'Nitin Baheti'
  },
  {
    id: 2,
    cat: 'Legal',
    title: 'GST on commercial property, explained simply',
    img: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&h=400&q=80',
    excerpt: 'Comprehensive overview of reverse charge, forward charge, and Input Tax Credit (ITC) for business tenants.',
    content: 'GST on commercial property leases is applicable at 18% under reverse charge or forward charge mechanisms depending on registration status. Corporate tenants can claim Input Tax Credit (ITC) on commercial rent, reducing their net tax burden significantly compared to unregistered operations.',
    date: '2026-10-10',
    readTime: '4 min read',
    author: 'Legal Team'
  },
  {
    id: 3,
    cat: 'Legal',
    title: 'The ultimate commercial rental agreement guide',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=400&q=80',
    excerpt: 'Key clauses every tenant and landlord should include in a commercial lease contract to prevent disputes.',
    content: 'From annual rental escalation clauses (typically 5% every year or 15% every 3 years) to force majeure, security deposit refund terms, and rent-free fit-out periods, a solid commercial agreement protects both parties against unexpected operational liabilities.',
    date: '2026-10-05',
    readTime: '6 min read',
    author: 'Sneha Baheti'
  },
  {
    id: 4,
    cat: 'Market',
    title: 'Sector V vs New Town: where should you lease in 2026?',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&h=400&q=80',
    excerpt: 'Comparative analysis of Kolkata top commercial tech business corridors for IT and corporate tenants.',
    content: 'While Sector V offers established enterprise infrastructure and seamless metro connectivity, New Town provides Grade-A modern IT parks like Mani Casadona and Ecospace with superior parking, greener environments, wider access roads, and competitive rental yields.',
    date: '2026-09-28',
    readTime: '7 min read',
    author: 'Research Desk'
  },
  {
    id: 5,
    cat: 'Market',
    title: 'Understanding rental yields in premium IT parks',
    img: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=600&h=400&q=80',
    excerpt: 'How institutional and private investors calculate net rental returns in commercial IT assets.',
    content: 'Commercial IT parks in Kolkata consistently generate 7.5% - 8.5% gross rental yields, significantly higher than residential yields of 2.5% - 3%. Factors include creditworthy corporate tenants, long-term 9-year lease commitments, and built-in periodic rent appreciations.',
    date: '2026-09-20',
    readTime: '5 min read',
    author: 'Nitin Baheti'
  },
  {
    id: 6,
    cat: 'Interior',
    title: 'Office interior costing: bare shell to move-in ready',
    img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=600&h=400&q=80',
    excerpt: 'Budgeting guide for civil work, MEP, acoustic panels, and ergonomic furniture installations.',
    content: 'Transforming a bare shell commercial office into a productive workplace requires detailed budgeting across HVAC, electrical distribution, fire fighting systems, network cabling, glazed acoustic partitions, and ergonomic modular workstations. Expect ₹1,800 to ₹3,500 per sq.ft depending on specifications.',
    date: '2026-09-12',
    readTime: '8 min read',
    author: 'Design Studio'
  }
];

export default function KnowledgeCentre() {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [activeCat, setActiveCat] = useState('All');
  const [serverCategories, setServerCategories] = useState([
    'Leasing',
    'Legal & GST',
    'Market Reports',
    'Interior',
    'Investment'
  ]);

  // Fetch blogs & categories dynamically
  const loadData = useCallback(async () => {
    try {
      const [blogRes, catRes] = await Promise.all([
        fetchBlogsApi().catch(() => ({ data: [] })),
        fetchCategoriesApi().catch(() => ({ data: [] }))
      ]);

      if (blogRes.data && blogRes.data.length > 0) {
        setBlogs(blogRes.data);
      }
      if (catRes.data && catRes.data.length > 0) {
        setServerCategories(catRes.data);
      }
    } catch (err) {
      console.log('Using static blogs fallback');
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // WebSocket listener
  const handleWs = useCallback((msg) => {
    if (msg.type === 'BLOGS_UPDATED') {
      if (msg.payload && msg.payload.length > 0) {
        setBlogs(msg.payload);
      }
    } else if (msg.type === 'CATEGORIES_UPDATED') {
      if (Array.isArray(msg.payload) && msg.payload.length > 0) {
        setServerCategories(msg.payload);
      }
    }
  }, []);

  useWebSocket(handleWs);

  // Dynamic categories combined from server categories + any custom category in blogs
  const allCategories = Array.from(
    new Set([
      ...serverCategories,
      ...blogs.map((b) => b.cat).filter(Boolean)
    ])
  );
  const categories = ['All', ...allCategories];

  const filteredBlogs = activeCat === 'All' 
    ? blogs 
    : blogs.filter((b) => b.cat && b.cat.trim().toLowerCase() === activeCat.trim().toLowerCase());

  return (
    <>
      <section style={{ paddingTop: '56px', paddingBottom: '36px' }}>
        <div className="eyebrow">Knowledge Centre</div>
        <h2 style={{ fontSize: '38px', maxWidth: '640px' }}>Guides for leasing, investing and building offices in Kolkata.</h2>
      </section>

      <div className="listing-shell">
        <div className="filter-col">
          <h4>Category</h4>
          {categories.map(cat => (
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
              filteredBlogs.map((b) => (
                <div 
                  key={b.id} 
                  className="card hover-card" 
                  onClick={() => setSelectedBlog(b)}
                  style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit', border: '1px solid var(--line)', background: 'var(--white)', borderRadius: '12px', overflow: 'hidden' }}
                >
                  <div style={{ height: '200px', backgroundImage: `url(${resolveMediaUrl(b.img)})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                  <div style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span className="mono" style={{ fontSize: '11px', color: 'var(--brass)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{b.cat}</span>
                      <span style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>{b.readTime || '5 min read'}</span>
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, lineHeight: 1.4, margin: '0 0 8px' }}>{b.title}</h3>
                    <p style={{ fontSize: '13px', color: 'var(--ink-soft)', lineHeight: 1.5, margin: 0 }}>
                      {b.excerpt || b.content?.slice(0, 100) + '...'}
                    </p>
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
                backgroundImage: `url(${resolveMediaUrl(selectedBlog.img)})`, 
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
                <span style={{ fontSize: '13px', color: '#666' }}>{selectedBlog.readTime || '5 min read'}</span>
                <span style={{ fontSize: '13px', color: '#666' }}>•</span>
                <span style={{ fontSize: '13px', color: '#666' }}>By {selectedBlog.author || '4Walls Team'}</span>
                {selectedBlog.date && (
                  <>
                    <span style={{ fontSize: '13px', color: '#666' }}>•</span>
                    <span style={{ fontSize: '13px', color: '#666' }}>{selectedBlog.date}</span>
                  </>
                )}
              </div>
              
              <h2 style={{ fontSize: '32px', fontWeight: 700, lineHeight: 1.2, marginBottom: '24px', color: '#111' }}>
                {selectedBlog.title}
              </h2>
              
              <div style={{ fontSize: '17px', lineHeight: 1.7, color: '#444' }}>
                {selectedBlog.excerpt && (
                  <p style={{ marginBottom: '20px', fontSize: '19px', color: '#222', lineHeight: 1.6, fontWeight: 500 }}>
                    {selectedBlog.excerpt}
                  </p>
                )}
                
                <p style={{ marginBottom: '20px', whiteSpace: 'pre-line' }}>
                  {selectedBlog.content}
                </p>

                <h4 style={{ fontSize: '22px', fontWeight: 600, color: '#111', marginTop: '32px', marginBottom: '16px' }}>
                  Key Commercial Takeaways
                </h4>
                <ul style={{ paddingLeft: '24px', marginBottom: '24px' }}>
                  <li style={{ marginBottom: '12px' }}>Verify floor plate efficiencies and statutory fire/safety compliances.</li>
                  <li style={{ marginBottom: '12px' }}>Consult with 4Walls commercial advisors before signing lock-in commitments.</li>
                  <li style={{ marginBottom: '12px' }}>Calculate total occupancy cost factoring in CAM, electricity, parking, and GST.</li>
                </ul>
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
