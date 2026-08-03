export const propertyNames = [
  ["Mani Casadona", "New Town", "1,500 sqft", "Lease", "IT Park"],
  ["Ecospace Business Park", "New Town", "4,200 sqft", "Lease", "IT Park"],
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
