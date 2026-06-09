import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { HeroPortrait } from "./HeroPortrait";

const letterVariants = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: 0,
    transition: { delay: 1.6 + i * 0.05, duration: 0.9, ease: [0.76, 0, 0.24, 1] as const },
  }),
};

function AnimatedWord({ word, offset = 0 }: { word: string; offset?: number }) {
  return (
    <span className="hero-title-word inline-flex max-w-full overflow-hidden leading-[0.88]">
      {word.split("").map((ch, i) => (
        <motion.span
          key={i}
          custom={i + offset}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          className="inline-block shrink-0"
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

function StatusBadge({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex items-center justify-end gap-2">
        <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-emerald-400" />
        Available for work
      </div>
      <div className="mt-1 text-right text-foreground/60">AI · Full-Stack · Automation</div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="section-hero">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-radial-glow" />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-[-10%] hidden h-[min(38vh,420px)] w-[min(38vh,420px)] -translate-y-1/2 opacity-35 lg:block"
      >
        <div className="absolute inset-0 rounded-full border border-white/10" />
        <div className="absolute inset-8 rounded-full border border-electric/30" />
        <div className="absolute inset-20 rounded-full border border-neon/20" />
        <div className="absolute inset-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-electric/40 to-neon/20 blur-3xl" />
      </motion.div>

      <div className="hero-shell">
        <div className="hero-grid">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="hero-meta font-mono uppercase tracking-[0.28em] text-muted-foreground md:text-xs md:tracking-[0.3em]"
          >
            <div>Portfolio / 2026</div>
            <div className="mt-0.5 text-foreground/60 md:mt-1">Ahmedabad, IN</div>
            <div className="mt-1.5 sm:hidden">
              <div className="flex items-center gap-2 tracking-[0.2em]">
                <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-emerald-400" />
                Available for work
              </div>
              <div className="mt-0.5 tracking-[0.16em] text-foreground/55">
                AI · Full-Stack · Automation
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="hero-status"
          >
            <StatusBadge />
          </motion.div>

          <div className="hero-headline">
            <div className="hero-title-block">
              <h1 className="hero-title-text">
                <span className="hero-title-line">
                  <AnimatedWord word="NISARG" />
                </span>
                <span className="hero-title-line text-electric-gradient">
                  <AnimatedWord word="PANCHAL" offset={6} />
                </span>
              </h1>
            </div>

            <div className="hero-visual">
              <HeroPortrait />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="hero-status--in-visual"
              >
                <StatusBadge />
              </motion.div>
            </div>
          </div>

          <div className="hero-footer">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.8 }}
              className="hero-intro space-y-2.5"
            >
              <div className="hero-intro-label section-eyebrow mb-0">
                <span className="h-px w-7 bg-muted-foreground/40 md:w-8" /> 001 — Intro
              </div>
              <p className="text-balance text-foreground/80">
                AI Engineer · Full-Stack Developer · building intelligent systems and
                scalable software for the next generation of products.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6, duration: 0.8 }}
              className="hero-cta-row"
            >
              <a href="#work" data-hover className="hero-cta hero-cta--ghost group">
                View Work
                <ArrowDownRight
                  size={16}
                  className="transition-transform group-hover:translate-y-0.5"
                />
              </a>
              <a href="#contact" data-hover className="hero-cta hero-cta--solid group">
                Contact
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
