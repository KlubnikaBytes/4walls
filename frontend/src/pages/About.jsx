export default function About() {
  return (
    <>
      <section className="py-xlarge">
        <div className="eyebrow">About Us</div>
        <h2 style={{ fontSize: '42px', maxWidth: '800px', marginBottom: '24px' }}>
          We don't just broker properties—we build lasting value through expertise, integrity, and execution.
        </h2>
        <div className="split" style={{ alignItems: 'flex-start', marginTop: '48px' }}>
          <p style={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--ink-soft)', maxWidth: 'none', margin: 0 }}>
            Founded with the vision to simplify commercial real estate in Kolkata. We provide end-to-end solutions from finding the right bare shell space to designing and delivering a fully functional, inspiring workplace for your team.
          </p>
          <p style={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--ink-soft)', maxWidth: 'none', margin: 0 }}>
            Together with a dedicated team, 4Walls Property Solutions delivers trusted expertise in commercial leasing, sales, investments, interiors, and asset management.
          </p>
        </div>
      </section>

      <section className="py-xlarge" style={{ backgroundColor: 'var(--white)' }}>
        <div className="eyebrow">Leadership</div>
        <h2 style={{ fontSize: '34px', marginBottom: '48px' }}>Meet Our Leaders</h2>
        
        <div className="split" style={{ alignItems: 'stretch', gap: '24px' }}>
          
          <div className="hover-card" style={{ background: 'var(--paper)', padding: '40px', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column' }}>
             <img src="/team/nitin.jpg" alt="Nitin Baheti" style={{ width: '100%', height: '360px', objectFit: 'cover', marginBottom: '24px' }} />
             <h3 style={{ fontFamily: 'Fraunces', fontSize: '26px', marginBottom: '4px' }}>Nitin Baheti</h3>
             <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '11px', color: 'var(--brass)', marginBottom: '24px', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
               Managing Director | 4Walls Property Solutions
             </div>
             <p style={{ fontSize: '14.5px', lineHeight: 1.65, color: 'var(--ink-soft)', margin: 0 }}>
               With over 20 years of experience in commercial real estate, Nitin Baheti founded 4Walls Property Solutions to provide end-to-end commercial real estate solutions. He has successfully developed 10+ commercial office assets and advised clients on the leasing, sale, investment, and management of 100+ commercial properties, with expertise in commercial interiors and workspace planning. He is also passionate about interior designing and workspace aesthetics.
             </p>
          </div>

          <div className="hover-card" style={{ background: 'var(--paper)', padding: '40px', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column' }}>
             <img src="/team/sneha.jpg" alt="Sneha Baheti" style={{ width: '100%', height: '360px', objectFit: 'cover', marginBottom: '24px' }} />
             <h3 style={{ fontFamily: 'Fraunces', fontSize: '26px', marginBottom: '4px' }}>Sneha Baheti</h3>
             <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '11px', color: 'var(--brass)', marginBottom: '24px', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
               Director | 4Walls Property Solutions
             </div>
             <p style={{ fontSize: '14.5px', lineHeight: 1.65, color: 'var(--ink-soft)', margin: 0 }}>
               With over 15 years of experience at TCS, ICICI Bank, and other leading organisations, Sneha Baheti leads business operations and client relationships at 4Walls. Her focus on operational excellence and customer experience ensures seamless delivery across every project.
             </p>
          </div>
          
        </div>
      </section>
    </>
  );
}
