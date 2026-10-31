const MARQUES = ["Ferrari", "Lamborghini", "BMW M", "Porsche", "McLaren", "Aston Martin", "Ducati", "Kawasaki"];

// Marque names as plain type: a list of favourites, not logos or endorsements.
export default function DreamGarage() {
  return (
    <section className="dream" aria-label="Dream garage">
      <p className="eyebrow">// dream garage</p>
      <div className="dream-track">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1}>
            {MARQUES.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
