
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
          <p style={{ color: 'var(--ink-soft)', marginBottom: '24px' }}>Fill out the form below or call us at <strong><a href="tel:+919051806000" style={{ color: 'inherit', textDecoration: 'none' }}>+91 90518 06000</a></strong>.</p>
          
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const data = Object.fromEntries(formData);
              const baseUrl = import.meta.env.VITE_BACKEND_URL || 'https://fourwalls-1.onrender.com';
              fetch(baseUrl + '/api/consultation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
              }).then(res => {
                if (!res.ok) throw new Error("Server error");
                return res.json();
              }).then(res => {
                alert("Thank you! We will contact you soon.");
                e.target.reset();
                setIsOpen(false);
              }).catch(err => {
                console.error(err);
                alert("Error submitting form. Please try again.");
              });
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}
          >
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Name</label>
              <input type="text" name="name" required minLength={2} pattern="^[A-Za-z\s.]+$" title="Only letters and spaces are allowed" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--white)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Email</label>
              <input type="email" name="email" required placeholder="Your email address" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--white)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Phone</label>
              <input 
                type="tel" 
                name="phone" 
                required 
                maxLength={15}
                pattern="^\+?[0-9]{10,15}$"
                title="Please enter a valid phone number (10-15 digits)"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--white)' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>I'm interested in...</label>
              <select name="interest" required defaultValue="" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--white)' }}>
                <option value="" disabled>Select an option</option>
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

          <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
            <a href="tel:+919051806000" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '8px', color: 'var(--ink)', textDecoration: 'none', fontWeight: 600 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              Call Us
            </a>
            <a href="https://wa.me/919051806000" target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '8px', color: 'var(--ink)', textDecoration: 'none', fontWeight: 600 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              WhatsApp
            </a>
          </div>

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
