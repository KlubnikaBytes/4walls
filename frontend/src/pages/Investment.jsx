import PropertyCard from '../components/PropertyCard';
import { getProperties } from '../utils/data';

export default function Investment() {
  const list = getProperties(3, 3);
  return (
    <>
      <section style={{ paddingTop: '56px' }}>
        <div className="eyebrow">Commercial Office Investment</div>
        <h2 style={{ fontSize: '34px', maxWidth: '600px' }}>Own the space businesses actually need.</h2>
      </section>
      <section style={{ paddingTop: 0 }}>
        <div className="card-grid">
          {list.map((p, i) => <PropertyCard key={i} {...p} />)}
        </div>
      </section>
      <section style={{ paddingTop: 0, borderTop: 'none' }}>
        <div className="quote-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="quote">
            <span className="eyebrow" style={{ marginBottom: '8px' }}>Case Study</span>
            <p>"Helped a Sector V tenant scale from 2,000 to 5,000 sqft without breaking their lease terms."</p>
            <div className="who">Problem → Solution → Result</div>
          </div>
          <div className="quote">
            <span className="eyebrow" style={{ marginBottom: '8px' }}>Tool</span>
            <p>Rental yield calculator — estimate returns on any commercial asset before you commit.</p>
            <div className="who">Open calculator →</div>
          </div>
        </div>
      </section>
    </>
  );
}
