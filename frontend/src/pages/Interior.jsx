import PropertyCard from '../components/PropertyCard';
import { getProperties } from '../utils/data';

export default function Interior() {
  const projects = getProperties(4, 1);
  return (
    <>
      <section style={{ paddingTop: '56px' }}>
        <div className="eyebrow">Office Interior Solutions</div>
        <h2 style={{ fontSize: '34px', maxWidth: '600px' }}>Design that makes an office feel like a decision, not a default.</h2>
      </section>
      <section style={{ paddingTop: 0 }}>
        <div className="section-head"><h2>Completed projects</h2><p></p></div>
        <div className="card-grid">
          {projects.map((p, i) => <PropertyCard key={i} {...p} />)}
        </div>
      </section>
      <section style={{ paddingTop: 0, borderTop: 'none' }}>
        <div className="section-head"><h2>Fit-out process</h2><p></p></div>
        <div className="card-grid" style={{ gridTemplateColumns: 'repeat(5,1fr)' }}>
          {['Brief', 'Design', 'Approval', 'Execution', 'Handover'].map((t, i) => (
            <div key={i} className="card" style={{ background: 'transparent', border: 'none' }}>
              <div className="mono" style={{ color: 'var(--brass)', fontSize: '11px', marginBottom: '8px' }}>0{i + 1}</div>
              <h3 style={{ fontSize: '15px' }}>{t}</h3>
            </div>
          ))}
        </div>
      </section>
      <div className="cta-strip">
        <h3>Have a floor plan in mind?</h3>
        <button className="btn-brass">Request a Fit-out Quote →</button>
      </div>
    </>
  );
}
