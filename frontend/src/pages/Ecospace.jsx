import PropertyCard from '../components/PropertyCard';
import { getProperties } from '../utils/data';

export default function Ecospace() {
  const list = getProperties(6, 3);
  return (
    <div className="listing-shell">
      <div className="filter-col">
        <h4>Ecospace Business Park</h4>
        <p style={{ fontSize: '13px', color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: '24px' }}>
          A lush, green business park in New Town with world-class facilities and connectivity.
        </p>
        <h4>Deal type</h4>
        <div className="chip on">Lease</div><div className="chip">Sale</div>
        <h4>Format</h4>
        <div className="chip on">Furnished</div><div className="chip">Bare Shell</div>
      </div>
      <div className="listing-main">
        <div className="result-bar">
          <h2 style={{ fontSize: '28px', margin: 0 }}>Properties in Ecospace</h2>
          <span>Sort: Relevance ▾</span>
        </div>
        <div className="listing-grid" style={{ marginTop: '32px' }}>
          {list.map((p, i) => <PropertyCard key={i} {...p} location="Ecospace" />)}
        </div>
      </div>
    </div>
  );
}
