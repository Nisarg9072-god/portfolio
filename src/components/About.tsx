import { motion } from "framer-motion";

const stats = [
  { v: "97", l: "Percentile · 12th" },
  { v: "8.85", l: "CPI · IT" },
  { v: "Top 8", l: "National Hackathon" },
  { v: "10+", l: "Shipped Projects" },
];

export function About() {
  return (
    <section id="about" className="section-page">
      <div className="section-wrap">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-eyebrow"
        >
          <span className="h-px w-8 bg-muted-foreground/40" /> 002 — Who I Am
        </motion.div>

        <div className="section-block grid gap-12 md:grid-cols-5 md:gap-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-balance type-section-title md:col-span-3"
          >
            Building{" "}
            <span className="text-electric-gradient">intelligent systems</span>{" "}
            that turn ideas into real-world impact.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-base leading-relaxed text-foreground/70 md:col-span-2"
          >
            <p>
              I&apos;m a second-year Information Technology student at LD
              College of Engineering with a deep focus on AI, full-stack
              development, automation and entrepreneurship.
            </p>
            <p>
              I obsess over building products that feel intelligent — systems
              that learn, adapt, and quietly solve hard problems in the
              background.
            </p>
          </motion.div>
        </div>

        <div className="section-stack grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border/40 bg-border/40 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-background p-5 sm:p-8 md:p-10"
            >
              <div className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                {s.v}
              </div>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {s.l}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
