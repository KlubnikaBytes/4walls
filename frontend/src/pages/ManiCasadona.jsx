import PropertyCard from '../components/PropertyCard';
import { getProperties } from '../utils/data';

export default function ManiCasadona() {
  const list = getProperties(6, 1);
  return (
    <div className="listing-shell">
      <div className="filter-col">
        <h4>Mani Casadona</h4>
        <p style={{ fontSize: '13px', color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: '24px' }}>
          Explore premium commercial spaces in New Town's most iconic IT park.
        </p>
        <h4>Deal type</h4>
        <div className="chip on">Lease</div><div className="chip">Sale</div>
        <h4>Format</h4>
        <div className="chip on">Furnished</div><div className="chip">Bare Shell</div>
      </div>
      <div className="listing-main">
        <div className="result-bar">
          <h2 style={{ fontSize: '28px', margin: 0 }}>Properties in Mani Casadona</h2>
          <span>Sort: Relevance ▾</span>
        </div>
        <div className="listing-grid" style={{ marginTop: '32px' }}>
          {list.map((p, i) => <PropertyCard key={i} {...p} location="Mani Casadona" />)}
        </div>
      </div>
    </div>
  );
}
