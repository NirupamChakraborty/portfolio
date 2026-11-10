const MESSAGES = [
  "Green flag",
  "Track clear",
  "DRS enabled",
  "Pit lane open",
  "Car 04 on a flying lap",
  "No yellow flags",
  "Tyres up to temperature",
];

// A race-control message ticker, like the strip along the bottom of a timing screen.
export default function RaceControl() {
  return (
    <div className="rc" aria-hidden="true">
      <div className="rc-track">
        {[0, 1].map((copy) => (
          <ul key={copy}>
            <li className="rc-title">Race control</li>
            {MESSAGES.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
