import BuildingSVG from './BuildingSVG';

export default function PropertyCard({ title, location, size, type, accentIdx }) {
  const isSale = type === 'Sale';
  const isInvestment = type === 'Investment';
  const price = isSale ? '₹ On Request' : isInvestment ? '8.2% Yield' : '₹68/sqft/mo';
  const cols = 4 + (accentIdx % 2);
  const rows = 3;

  return (
    <div className="card">
      <div className="thumb">
        <BuildingSVG cols={cols} rows={rows} accentIdx={accentIdx} />
        <div className="tag">{type}</div>
      </div>
      <div className="body">
        <h3>{title}</h3>
        <div className="meta">
          <span>{location}</span>
          <span>{size}</span>
        </div>
        <div className="price">{price}</div>
      </div>
    </div>
  );
}
