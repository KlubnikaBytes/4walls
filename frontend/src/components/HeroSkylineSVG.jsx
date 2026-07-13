export default function HeroSkylineSVG() {
  const hLines1 = Array.from({ length: 8 }).map((_, i) => (
    <line
      key={`h1-${i}`}
      x1="150"
      y1={80 + i * 30}
      x2="260"
      y2={80 + i * 30}
      stroke="#24423A"
      strokeWidth="0.6"
      opacity="0.5"
    />
  ));
  const hLines2 = Array.from({ length: 7 }).map((_, i) => (
    <line
      key={`h2-${i}`}
      x1="380"
      y1={110 + i * 32}
      x2="480"
      y2={110 + i * 32}
      stroke="#A97D2F"
      strokeWidth="0.6"
      opacity="0.6"
    />
  ));

  return (
    <svg viewBox="0 0 520 420" fill="none">
      <rect x="40" y="120" width="90" height="260" fill="none" stroke="#24423A" strokeWidth="1.4" />
      <rect x="150" y="60" width="110" height="320" fill="none" stroke="#24423A" strokeWidth="1.4" />
      <rect x="280" y="150" width="80" height="230" fill="none" stroke="#24423A" strokeWidth="1.4" />
      <rect x="380" y="90" width="100" height="290" fill="none" stroke="#A97D2F" strokeWidth="1.6" />
      {hLines1}
      {hLines2}
      <line x1="20" y1="380" x2="500" y2="380" stroke="#16231F" strokeWidth="1.4" />
      <line x1="380" y1="400" x2="480" y2="400" stroke="#A97D2F" strokeWidth="1" />
      <line x1="380" y1="396" x2="380" y2="404" stroke="#A97D2F" strokeWidth="1" />
      <line x1="480" y1="396" x2="480" y2="404" stroke="#A97D2F" strokeWidth="1" />
    </svg>
  );
}
