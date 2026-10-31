// The site's own racing crest: a shield with a speed stripe and the NC monogram.
export default function Emblem({ size = 30 }) {
  return (
    <svg className="emblem" width={size} height={size * 1.15} viewBox="0 0 40 46" aria-hidden="true">
      <path d="M20 1 38 7v17c0 10-7 16-18 21C9 40 2 34 2 24V7z" fill="#0d0d0f" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 34 32 8h4L12 38z" fill="#e10600" />
      <path d="M5 28 26 7h3L7 31z" fill="#ffc400" />
      <text x="20" y="27" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="800" fontStyle="italic">
        NC
      </text>
    </svg>
  );
}
