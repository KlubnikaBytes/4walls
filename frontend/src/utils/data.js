export const propertyNames = [
  ["Ecospace Business Park", "New Town", "4,200 sqft", "Lease"],
  ["DN-51 Corporate Tower", "Sector V", "8,600 sqft", "Sale"],
  ["Candor TechSpace", "Rajarhat", "2,100 sqft", "Coworking"],
  ["Godrej Genesis", "Salt Lake", "12,000 sqft", "Investment"],
];

export function getProperties(n, offset = 0) {
  const result = [];
  for (let i = 0; i < n; i++) {
    const p = propertyNames[(i + offset) % propertyNames.length];
    result.push({
      title: p[0],
      location: p[1],
      size: p[2],
      type: p[3],
      accentIdx: i,
    });
  }
  return result;
}
