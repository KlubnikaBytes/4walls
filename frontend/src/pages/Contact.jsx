export default function Contact() {
  return (
    <>
      <section style={{ paddingTop: '56px', paddingBottom: 0 }}>
        <div className="eyebrow">Contact</div>
        <h2 style={{ fontSize: '32px' }}>Let's find your next office.</h2>
      </section>
      <div className="contact-grid" style={{ margin: '36px clamp(16px, 4vw, 48px) 0' }}>
        <form 
          className="contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            const baseUrl = import.meta.env.VITE_BACKEND_URL || '';
            fetch(baseUrl + '/api/consultation', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            }).then(res => res.json()).then(res => {
              alert("Thank you! We will contact you soon.");
              e.target.reset();
            }).catch(err => {
              alert("Error submitting form. Please try again.");
            });
          }}
        >
          <div className="f"><label>Name</label><input type="text" name="name" className="inp" required minLength={2} pattern="^[A-Za-z\s\.]+$" title="Only letters and spaces are allowed" placeholder="Your name" /></div>
          <div className="f"><label>Email</label><input type="email" name="email" className="inp" required pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" title="Please enter a valid email address" placeholder="Your email address" /></div>
          <div className="f"><label>Phone</label><input type="tel" name="phone" className="inp" required pattern="^\+?[0-9]{10,15}$" title="Please enter a valid phone number (10-15 digits)" placeholder="+91" /></div>
          <div className="f">
            <label>Interested in</label>
            <select name="interest" className="inp" required defaultValue="" style={{ height: '44px', background: 'transparent' }}>
              <option value="" disabled>Select an option</option>
              <option value="Mani Casadona">Mani Casadona</option>
              <option value="Ecospace">Ecospace Business Park</option>
              <option value="Managed Space">Managed Space</option>
              <option value="Interior Designing">Interior Designing</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="f"><label>Message</label><textarea name="message" required className="inp" style={{ height: '60px' }}></textarea></div>
          <button type="submit" className="btn-brass">Send Enquiry</button>
        </form>
        <div className="map-block" style={{ padding: 0, overflow: 'hidden' }}><iframe src="https://maps.google.com/maps?q=22.5859932,88.4865422+(Mani+Casadona)&t=&z=16&ie=UTF8&iwloc=B&output=embed" width="100%" height="100%" frameBorder="0" style={{ border: 0, minHeight: '300px' }} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe></div>
      </div>
      <div className="info-strip" style={{ margin: '0 clamp(16px, 4vw, 48px)' }}>
        <div className="info-item"><span className="k">Phone / WhatsApp</span><a href="tel:+919051806000" className="v" style={{ textDecoration: 'none', color: 'inherit' }}>+91 90518 06000</a></div>
        <div className="info-item"><span className="k">Email</span><a href="mailto:sales@4walls.co.in" className="v" style={{ textDecoration: 'none', color: 'inherit' }}>sales@4walls.co.in</a></div>
        <div className="info-item"><span className="k">Office Timing</span><span className="v">Mon–Sat, 10am–7pm</span></div>
        <div className="info-item">
          <span className="k">Follow Us</span>
          <div style={{ display: 'flex', gap: '12px', color: 'var(--ink)', marginTop: '2px' }}>
            <a href="https://www.facebook.com/share/1KwsLs4bke/" target="_blank" rel="noreferrer" style={{ color: 'inherit', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--brass)'} onMouseOut={e => e.currentTarget.style.color = 'inherit'} title="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="https://www.instagram.com/4wallspropertysolution?stkn=ZWNrZzY3aTU3YjBt" target="_blank" rel="noreferrer" style={{ color: 'inherit', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--brass)'} onMouseOut={e => e.currentTarget.style.color = 'inherit'} title="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://www.linkedin.com/in/4walls-property-solutions-878152242" target="_blank" rel="noreferrer" style={{ color: 'inherit', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--brass)'} onMouseOut={e => e.currentTarget.style.color = 'inherit'} title="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="https://m.youtube.com/%404wallspropertysolutions211?fbclid=PAb21jcAUpoqFleHRuA2FlbQIxMQBwZG9mAnNydGMGYXBwX2lkDzU2NzA2NzM0MzM1MjQyNwABp0Zar8TheNZN8jjQnSM1KGgoEgl_JsviEhtj67lLfs4tkoqtZhs1zpMjke-i_aem_pVbFMhPVuMn-iv1zBbzFdA" target="_blank" rel="noreferrer" style={{ color: 'inherit', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--brass)'} onMouseOut={e => e.currentTarget.style.color = 'inherit'} title="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
          </div>
        </div>
      </div>
      <section style={{ margin: '0 0', paddingTop: '32px' }}>
        <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', padding: '0 0', gap: '16px' }}>
          <a href="tel:+919051806000" className="card" style={{ padding: '24px', border: '1px solid var(--line)', textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--brass)'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.transform = 'none'; }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '12px' }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <h3 style={{ fontSize: '16px', marginBottom: '4px' }}>Call Us</h3>
            <p style={{ fontSize: '12.5px', color: 'var(--ink-soft)' }}>Speak with our experts</p>
          </a>
          <a href="https://wa.me/919051806000" target="_blank" rel="noopener noreferrer" className="card" style={{ padding: '24px', border: '1px solid var(--line)', textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--brass)'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.transform = 'none'; }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#25D366" style={{ marginBottom: '12px' }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            <h3 style={{ fontSize: '16px', marginBottom: '4px' }}>WhatsApp</h3>
            <p style={{ fontSize: '12.5px', color: 'var(--ink-soft)' }}>Chat with us instantly</p>
          </a>
          <div onClick={() => window.dispatchEvent(new Event('open-consultation'))} className="card" style={{ padding: '24px', border: '1px solid var(--line)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--brass)'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.transform = 'none'; }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '12px', color: 'var(--ink)' }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            <h3 style={{ fontSize: '16px', marginBottom: '4px' }}>Book Form</h3>
            <p style={{ fontSize: '12.5px', color: 'var(--ink-soft)' }}>Schedule a detailed consultation</p>
          </div>
        </div>
      </section>
    </>
  );
}
