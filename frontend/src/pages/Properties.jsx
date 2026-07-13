import PropertyCard from '../components/PropertyCard';
import { getProperties } from '../utils/data';

export default function Properties() {
  const list = getProperties(6);
  return (
    <div className="listing-shell">
      <div className="filter-col">
        <h4>Deal type</h4>
        <div className="chip on">Lease</div><div className="chip">Sale</div><div className="chip">Investment</div><div className="chip">Pre-leased</div>
        <h4>Format</h4>
        <div className="chip">Coworking</div><div className="chip on">Small Office</div><div className="chip">Large Office</div><div className="chip">Entire Floor</div><div className="chip">Managed Office</div>
        <h4>Fit-out</h4>
        <div className="chip on">Furnished</div><div className="chip">Bare Shell</div>
        <h4>Budget</h4>
        <div className="mono" style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>₹30 – ₹100 / sqft / mo</div>
      </div>
      <div className="listing-main">
        <div className="result-bar"><span>128 offices found</span><span>Sort: Relevance ▾</span></div>
        <div className="listing-grid">
          {list.map((p, i) => <PropertyCard key={i} {...p} />)}
        </div>
      </div>
    </div>
  );
}
