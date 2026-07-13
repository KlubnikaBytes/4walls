export default function Contact() {
  return (
    <>
      <section style={{ paddingTop: '56px', paddingBottom: 0 }}>
        <div className="eyebrow">Contact</div>
        <h2 style={{ fontSize: '32px' }}>Let's find your next office.</h2>
      </section>
      <div className="contact-grid" style={{ margin: '36px 48px 0' }}>
        <div className="contact-form">
          <div className="f"><label>Name</label><input className="inp" placeholder="Your name" /></div>
          <div className="f"><label>Phone</label><input className="inp" placeholder="+91" /></div>
          <div className="f"><label>Interested in</label><input className="inp" placeholder="Lease / Buy / Interior / Invest" /></div>
          <div className="f"><label>Message</label><textarea className="inp" style={{ height: '60px' }}></textarea></div>
          <button className="btn-brass">Send Enquiry</button>
        </div>
        <div className="map-block">Google Map — New Town, Kolkata</div>
      </div>
      <div className="info-strip" style={{ margin: '0 48px' }}>
        <div className="info-item"><span className="k">WhatsApp</span><span className="v">+91 98XXX XXXXX</span></div>
        <div className="info-item"><span className="k">Phone</span><span className="v">+91 33 XXXX XXXX</span></div>
        <div className="info-item"><span className="k">Email</span><span className="v">hello@4walls.in</span></div>
        <div className="info-item"><span className="k">Office Timing</span><span className="v">Mon–Sat, 10am–7pm</span></div>
      </div>
      <section style={{ margin: '0 0', paddingTop: '32px' }}>
        <div className="card-grid" style={{ gridTemplateColumns: '1fr 1fr', padding: '0 0' }}>
          <div className="card" style={{ padding: '24px', border: '1px solid var(--line)' }}><h3 style={{ fontSize: '16px', marginBottom: '6px' }}>Book a site visit</h3><p style={{ fontSize: '12.5px', color: 'var(--ink-soft)' }}>Pick a date and time to see a shortlisted space in person.</p></div>
          <div className="card" style={{ padding: '24px', border: '1px solid var(--line)' }}><h3 style={{ fontSize: '16px', marginBottom: '6px' }}>Schedule a meeting</h3><p style={{ fontSize: '12.5px', color: 'var(--ink-soft)' }}>Talk through leasing, investment or interior needs with an advisor.</p></div>
        </div>
      </section>
    </>
  );
}
