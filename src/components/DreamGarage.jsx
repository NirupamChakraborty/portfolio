const CARS = ["Pagani", "Ferrari", "Lamborghini", "Koenigsegg", "Bugatti", "McLaren", "Porsche", "BMW M", "Aston Martin"];
const BIKES = ["Ducati", "Yamaha", "Kawasaki", "Honda", "Aprilia", "KTM", "Suzuki", "BMW Motorrad"];

function Row({ names, className = "" }) {
  return (
    <div className={`dream-track ${className}`}>
      {[0, 1].map((copy) => (
        <ul key={copy} aria-hidden={copy === 1}>
          {names.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      ))}
    </div>
  );
}

// Marque names as plain type: a list of favourites, not logos or endorsements.
export default function DreamGarage() {
  return (
    <section className="dream" aria-label="Dream garage">
      <p className="eyebrow">// dream garage: four wheels, then two</p>
      <Row names={CARS} />
      <Row names={BIKES} className="is-bikes" />
    </section>
  );
}
