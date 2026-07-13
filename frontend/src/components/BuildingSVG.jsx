export default function BuildingSVG({ cols, rows, accentIdx, h = 160 }) {
  const bars = [];
  const bw = 300 / cols;
  const bh_ = (h * 0.62) / rows;
  const top = h * 0.14;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const on = (r + c + accentIdx) % 3 !== 0;
      bars.push(
        <rect
          key={`${r}-${c}`}
          x={c * bw + 8}
          y={top + r * bh_ + 6}
          width={bw - 14}
          height={bh_ - 8}
          fill={on ? '#24423A' : 'none'}
          stroke="#24423A"
          strokeWidth="1"
          opacity={on ? 0.55 : 0.9}
        />
      );
    }
  }

  return (
    <svg viewBox={`0 0 300 ${h}`} preserveAspectRatio="none">
      <rect x="0" y="0" width="300" height={h} fill="#E4E0D3" />
      <rect
        x="4"
        y={top - 4}
        width="292"
        height={h * 0.62 + 8}
        fill="none"
        stroke="#A97D2F"
        strokeWidth="1.5"
      />
      {bars}
      <line x1="0" y1={h * 0.9} x2="300" y2={h * 0.9} stroke="#A97D2F" strokeWidth="1" />
    </svg>
  );
}
