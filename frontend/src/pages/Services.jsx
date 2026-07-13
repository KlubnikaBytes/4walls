export default function Services() {
  return (
    <>
      <section style={{ paddingTop: '56px' }}>
        <div className="eyebrow">What we do</div>
        <h2 style={{ fontSize: '36px', maxWidth: '640px' }}>Office space solutions, end to end.</h2>
      </section>
      <section style={{ paddingTop: 0 }}>
        <div className="service-list">
          <div className="service-item"><span className="idx">01</span><h3>Office Leasing</h3><p>Search, shortlist, negotiate — we handle the full leasing cycle for tenants of any size.</p></div>
          <div className="service-item"><span className="idx">02</span><h3>Office Buying &amp; Investment</h3><p>Purchase advisory, rental-yield properties and pre-leased assets for investors.</p></div>
          <div className="service-item"><span className="idx">03</span><h3>Interior &amp; Workspace Design</h3><p>Complete fit-outs — design, furniture, execution and handover.</p></div>
          <div className="service-item"><span className="idx">04</span><h3>Property Management</h3><p>Rent collection, tenant relations, maintenance and documentation.</p></div>
          <div className="service-item"><span className="idx">05</span><h3>Portfolio Advisory</h3><p>Consolidated reporting and strategy for owners of multiple commercial assets.</p></div>
          <div className="service-item"><span className="idx">—</span><h3>Talk to an advisor</h3><p style={{ color: 'var(--brass)', borderBottom: '1px solid var(--brass)', display: 'inline-block' }}>Schedule a call →</p></div>
        </div>
      </section>
      <section>
        <div className="section-head"><h2>How we work</h2><p></p></div>
        <div className="card-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
          {['Enquiry', 'Consultation', 'Shortlist & Visit', 'Close & Deliver'].map((t, i) => (
            <div key={i} className="card" style={{ background: 'transparent', border: 'none' }}>
              <div className="mono" style={{ color: 'var(--brass)', fontSize: '11px', marginBottom: '8px' }}>0{i + 1}</div>
              <h3 style={{ fontSize: '16px' }}>{t}</h3>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
