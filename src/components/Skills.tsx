import { motion } from "framer-motion";
import { ThreeCarousel } from "@/components/stack-carousel/ThreeCarousel";

export function Skills() {
  return (
    <section id="skills" className="section-page overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-40" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[min(600px,100vw)] w-[min(600px,100vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/5 blur-[120px]" />

      <div className="section-wrap relative">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-4 lg:col-span-4"
          >
            <div className="section-eyebrow">
              <span className="h-px w-8 bg-muted-foreground/40" /> 003 — Toolkit
            </div>
            <h2 className="type-section-title">
              Stack I build with.
            </h2>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-muted-foreground">
              Technologies, frameworks, and tools I use to build intelligent,
              scalable, and modern digital products.
            </p>
            <div className="mt-6 flex flex-col gap-3 md:mt-8 lg:hidden">
              {["24 technologies", "Continuous rotation", "Tap to expand"].map(
                (item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
                  >
                    <span className="h-1 w-1 rounded-full bg-electric" />
                    {item}
                  </motion.div>
                ),
              )}
            </div>
            <div className="mt-8 hidden flex-col gap-3 lg:flex">
              {["24 technologies", "Continuous rotation", "Click to expand"].map(
                (item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
                  >
                    <span className="h-1 w-1 rounded-full bg-electric" />
                    {item}
                  </motion.div>
                ),
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0 md:col-span-8 lg:col-span-8"
          >
            <div className="relative w-full rounded-2xl border border-border/50 bg-gradient-to-b from-white/[0.04] to-transparent p-px shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:rounded-3xl">
              <div className="relative overflow-hidden rounded-[calc(1rem-1px)] bg-background/40 backdrop-blur-sm sm:rounded-[calc(1.5rem-1px)]">
                <div className="pointer-events-none absolute top-0 left-0 h-10 w-10 rounded-tl-2xl border-t border-l border-electric/20 sm:h-16 sm:w-16 sm:rounded-tl-3xl" />
                <div className="pointer-events-none absolute top-0 right-0 h-10 w-10 rounded-tr-2xl border-t border-r border-electric/20 sm:h-16 sm:w-16 sm:rounded-tr-3xl" />
                <div className="pointer-events-none absolute bottom-0 left-0 h-10 w-10 rounded-bl-2xl border-b border-l border-electric/20 sm:h-16 sm:w-16 sm:rounded-bl-3xl" />
                <div className="pointer-events-none absolute right-0 bottom-0 h-10 w-10 rounded-br-2xl border-r border-b border-electric/20 sm:h-16 sm:w-16 sm:rounded-br-3xl" />
                <div className="p-3 sm:p-4 md:p-6">
                  <ThreeCarousel />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
