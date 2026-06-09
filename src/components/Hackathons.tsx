import { motion } from "framer-motion";

const items = [
  {
    yr: "2025",
    name: "National Level Hackathon",
    rank: "Top 8",
    role: "ML & Backend Developer",
    desc: "Built an ML-driven backend that placed in the national top 8 from hundreds of teams.",
  },
  {
    yr: "2025",
    name: "Nirman Hackathon",
    rank: "Finalist",
    role: "AI & Core Developer",
    desc: "Led core AI implementation and architecture for a high-performing submission.",
  },
];

const certs = [
  {
    name: "Data Science Specialization",
    issuer: "Professional Certification",
    skills: ["Machine Learning", "Deep Learning", "RAG", "Deployment"],
  },
  {
    name: "Robotics & AI Masterclass",
    issuer: "Advanced Training",
    skills: ["OpenCV", "ROS-2", "Autonomous Nav", "Computer Vision"],
  },
];

export function Hackathons() {
  return (
    <section id="recognition" className="section-page">
      <div className="section-wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="section-block"
        >
          <div className="section-eyebrow">
            <span className="h-px w-8 bg-muted-foreground/40" /> 005 — Recognition
          </div>
          <h2 className="type-section-title">
            Hackathons &{" "}
            <span className="text-electric-gradient">credentials</span>.
          </h2>
        </motion.div>

        <div className="space-y-px overflow-hidden rounded-3xl border border-border/40 bg-border/40">
          {items.map((h, i) => (
            <motion.div
              key={h.name}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group flex flex-col gap-3 bg-background p-5 transition-colors hover:bg-card sm:grid sm:grid-cols-12 sm:items-center sm:gap-4 sm:p-6 md:p-10"
            >
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground sm:col-span-2">
                {h.yr}
              </div>
              <div className="sm:col-span-5">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <div className="font-display text-lg font-semibold sm:text-xl md:text-3xl">
                    {h.name}
                  </div>
                  <span className="text-electric-gradient font-display text-xl font-bold sm:hidden md:text-2xl">
                    {h.rank}
                  </span>
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {h.role}
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-foreground/60 md:hidden">
                  {h.desc}
                </p>
              </div>
              <div className="hidden text-sm text-foreground/60 sm:col-span-3 md:block">
                {h.desc}
              </div>
              <div className="hidden text-right sm:col-span-2 sm:block">
                <span className="text-electric-gradient font-display text-2xl font-bold md:text-3xl">
                  {h.rank}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="section-stack grid gap-4 md:grid-cols-2">
          {certs.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 transition-colors hover:bg-white/[0.03]"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {c.issuer}
              </div>
              <div className="mt-2 font-display text-xl font-semibold">
                {c.name}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {c.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-secondary px-3 py-1 text-xs text-foreground/80"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
