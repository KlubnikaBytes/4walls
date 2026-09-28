
import React, { useState, useEffect } from 'react';

export default function ConsultationModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-consultation', handleOpen);
    return () => window.removeEventListener('open-consultation', handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div 
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
          zIndex: 9999, transition: 'opacity 0.3s'
        }}
        onClick={() => setIsOpen(false)}
      />
      <div
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: '500px',
          background: 'var(--paper)', zIndex: 10000, overflowY: 'auto',
          boxShadow: '-10px 0 40px rgba(0,0,0,0.2)',
          display: 'flex', flexDirection: 'column',
          animation: 'slideInRight 0.3s forwards'
        }}
      >
        <style>{`
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}</style>

        <div style={{ padding: '24px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--white)' }}>
          <h2 style={{ fontSize: '24px', margin: 0 }}>Book a Consultation</h2>
          <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', color: 'var(--ink)' }}>✕</button>
        </div>

        <div style={{ padding: '24px', flex: 1 }}>
          <p style={{ color: 'var(--ink-soft)', marginBottom: '24px' }}>Fill out the form below or call us at <strong>+91 90518 06000</strong>.</p>
          
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const data = Object.fromEntries(formData);
              fetch(import.meta.env.VITE_BACKEND_URL + '/api/consultation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
              }).then(res => res.json()).then(res => {
                alert("Thank you! We will contact you soon.");
                e.target.reset();
                setIsOpen(false);
              }).catch(err => {
                alert("Error submitting form. Please try again.");
              });
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}
          >
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Name</label>
              <input type="text" name="name" required style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--white)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Email</label>
              <input type="email" name="email" required style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--white)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Phone</label>
              <input 
                type="tel" 
                name="phone" 
                required 
                maxLength={15}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--white)' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>I'm interested in...</label>
              <select name="interest" required style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--white)' }}>
                <option value="Mani Casadona">Mani Casadona</option>
                <option value="Ecospace">Ecospace Business Park</option>
                <option value="Managed Space">Managed Space</option>
                <option value="Interior Designing">Interior Designing</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>How can we help?</label>
              <textarea name="message" rows="3" required style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--white)', resize: 'vertical' }}></textarea>
            </div>
            <button type="submit" className="btn-brass" style={{ padding: '14px', border: 'none', cursor: 'pointer', fontSize: '15px', marginTop: '8px' }}>Submit Request</button>
          </form>

          <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Visit Us at Mani Casadona</h3>
          <p style={{ color: 'var(--ink-soft)', marginBottom: '16px', fontSize: '14px' }}>11F, 04, Street Number 372, Action Area I, IIF, New Town, Kolkata, Chakpachuria, West Bengal 700160</p>
          <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--line)', height: '250px' }}>
            <iframe 
              src="https://maps.google.com/maps?q=22.5859932,88.4865422+(Mani+Casadona)&t=&z=16&ie=UTF8&iwloc=B&output=embed"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </div>
    </>
  );
}
