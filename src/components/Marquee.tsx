export function Marquee() {
  const items = [
    "AI Engineer",
    "Full-Stack Developer",
    "Automation Builder",
    "Startup Mindset",
    "RAG Systems",
    "Computer Vision",
  ];
  const row = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-border/40 py-5 md:py-8">
      <div className="flex animate-marquee gap-8 whitespace-nowrap md:gap-16">
        {row.map((it, i) => (
          <div
            key={i}
            className="flex items-center gap-8 font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl md:gap-16 md:text-6xl"
          >
            <span className={i % 2 === 0 ? "text-foreground" : "text-foreground/20"}>
              {it}
            </span>
            <span className="text-electric">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
