export default function Ticker() {
    const items = [
      "Full-Stack Developer",
      "GenAI Explorer",
      "React Specialist",
    ];
  
    return (
      <div className="ticker">
        <div className="ticker-inner">
          {[...items, ...items].map((t, i) => (
            <span key={i} className="ticker-item">
              {t} <span>◆</span>
            </span>
          ))}
        </div>
      </div>
    );
  }