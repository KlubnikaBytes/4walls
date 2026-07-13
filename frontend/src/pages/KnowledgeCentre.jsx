import { Link } from 'react-router-dom';

export default function KnowledgeCentre() {
  const blogs = [
    { cat: 'Leasing', title: 'How to lease your first commercial office in Kolkata', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&h=400&q=80' },
    { cat: 'Legal', title: 'GST on commercial property, explained simply', img: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&h=400&q=80' },
    { cat: 'Legal', title: 'The ultimate commercial rental agreement guide', img: 'https://images.unsplash.com/photo-1450101499163-c8848c66cb85?auto=format&fit=crop&w=600&h=400&q=80' },
    { cat: 'Market', title: 'Sector V vs New Town: where should you lease in 2026?', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&h=400&q=80' },
    { cat: 'Market', title: 'Understanding rental yields in premium IT parks', img: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=600&h=400&q=80' },
    { cat: 'Interior', title: 'Office interior costing: bare shell to move-in ready', img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=600&h=400&q=80' },
  ];

  const resources = [
    'Pre-rental checklist',
    'Handover checklist',
    'Lease checklist',
    'Interior budget calculator',
    'Rental yield calculator',
    'Office space calculator'
  ];

  return (
    <>
      <section style={{ paddingTop: '56px', paddingBottom: '36px' }}>
        <div className="eyebrow">Knowledge Centre</div>
        <h2 style={{ fontSize: '38px', maxWidth: '640px' }}>Guides for leasing, investing and building offices in Kolkata.</h2>
      </section>

      <div className="listing-shell">
        <div className="filter-col">
          <h4>Category</h4>
          <div className="chip on">Leasing</div>
          <div className="chip">Investment</div>
          <div className="chip">Legal</div>
          <div className="chip">Interior</div>
          <div className="chip">Market Reports</div>
        </div>
        <div className="listing-main">
          
          <div className="art-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {blogs.map((b, i) => (
              <Link to="#" key={i} className="card hover-card" style={{ textDecoration: 'none', color: 'inherit', border: '1px solid var(--line)', background: 'var(--white)', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ height: '200px', backgroundImage: `url(${b.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div style={{ padding: '24px' }}>
                  <span className="mono" style={{ fontSize: '11px', color: 'var(--brass)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', display: 'block' }}>{b.cat}</span>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, lineHeight: 1.4 }}>{b.title}</h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="section-head" style={{ marginTop: '64px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px' }}>Resources &amp; downloads</h2>
          </div>
          
          <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {resources.map((t, i) => (
              <div key={i} className="card hover-card" style={{ background: 'transparent', border: '1px solid var(--line)', padding: '24px', borderRadius: '12px', cursor: 'pointer' }}>
                <h3 style={{ fontSize: '15px', marginBottom: '12px', lineHeight: 1.4 }}>{t}</h3>
                <span className="mono" style={{ fontSize: '11px', color: 'var(--brass)' }}>Download →</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
