export default function FloatingContact() {
  return (
    <div style={{
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '12px'
    }}>

      {/* WhatsApp Chat Button */}
      <a
        href="https://wa.me/919051806000"
        target="_blank"
        rel="noreferrer"
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#25D366',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(37, 211, 102, 0.4)',
          transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
          cursor: 'pointer',
          marginRight: '6px' // Slightly offset to center over the button below
        }}
        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        title="Chat on WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 0C5.397 0 0 5.397 0 12.031c0 2.12.553 4.186 1.6 6l-1.6 5.969 6.1-1.6c1.767.95 3.75 1.45 5.8 1.45 6.634 0 12.031-5.397 12.031-12.031S18.665 0 12.031 0zm0 22c-1.8 0-3.567-.483-5.114-1.4l-.367-.216-3.8.995.995-3.8-.216-.367A9.914 9.914 0 012.031 12C2.031 6.486 6.514 2 12.031 2c5.514 0 10 4.486 10 10s-4.486 10-10 10zm5.385-7.385c-.297-.15-1.758-.867-2.03-.967-.272-.1-.47-.15-.668.15-.198.3-.768.967-.94 1.167-.173.2-.347.225-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.76-1.653-2.06-.173-.298-.018-.46.13-.608.134-.134.298-.348.446-.522.15-.174.2-.298.298-.497.1-.2.05-.373-.025-.522-.075-.15-.668-1.611-.916-2.206-.24-.582-.486-.503-.668-.513-.173-.01-.371-.01-.569-.01-.198 0-.52.075-.792.373-.272.298-1.04 1.018-1.04 2.482 0 1.464 1.065 2.878 1.213 3.078.149.2 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.227 1.36.195 1.872.118.571-.086 1.758-.718 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.569-.347z" />
        </svg>
      </a>

      {/* Book Consultation Button */}
      <button
        onClick={() => window.dispatchEvent(new Event('open-consultation'))}
        style={{
          background: 'var(--teal)',
          color: '#fff',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '30px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontFamily: "'Inter', sans-serif",
          fontSize: '15px',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 6px 20px rgba(31, 149, 164, 0.4)',
          transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease, background 0.2s ease'
        }}
        onMouseOver={e => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(31, 149, 164, 0.5)';
          e.currentTarget.style.background = 'var(--ink)';
        }}
        onMouseOut={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(31, 149, 164, 0.4)';
          e.currentTarget.style.background = 'var(--teal)';
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
          <path d="M9 16l2 2 4-4"></path>
        </svg>
        Book Consultation
      </button>

    </div>
  );
}
