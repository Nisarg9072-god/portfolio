import { AnimatePresence, motion } from "framer-motion";
import type { Technology } from "./technologies";

type CenterHeroProps = {
  tech: Technology;
  index: number;
  total: number;
  size?: "default" | "large";
  compact?: boolean;
};

export function CenterHero({
  tech,
  index,
  total,
  size = "default",
  compact = false,
}: CenterHeroProps) {
  const large = size === "large";

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-3 sm:px-5 md:px-6">
      <div
        className={`absolute rounded-full bg-electric/5 blur-3xl ${
          large
            ? "h-40 w-40 sm:h-56 sm:w-56 md:h-72 md:w-72 lg:h-96 lg:w-96"
            : compact
              ? "h-28 w-28 sm:h-40 sm:w-40 md:h-52 md:w-52"
              : "h-32 w-32 sm:h-44 sm:w-44 md:h-56 md:w-56"
        }`}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, y: 20, scale: 0.96, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -16, scale: 0.98, filter: "blur(4px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={`relative w-full max-w-[92%] text-center sm:max-w-xl ${large ? "md:max-w-2xl" : ""}`}
        >
          <div
            className={`glass mx-auto inline-flex items-center gap-1.5 rounded-full border border-electric/20 px-2.5 py-1 sm:gap-2 sm:px-3 sm:py-1.5 md:px-4 ${
              compact ? "mb-2" : "mb-3 sm:mb-4 md:mb-5"
            }`}
          >
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-electric/80 sm:text-[10px] sm:tracking-[0.25em]">
              Active Stack
            </span>
            <span className="font-mono text-[8px] text-muted-foreground sm:text-[10px]">
              {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
            </span>
          </div>

          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.06, duration: 0.35, ease: "backOut" }}
            className={`mx-auto flex items-center justify-center rounded-xl sm:rounded-2xl ${
              compact ? "mb-2 h-10 w-10 sm:mb-3 sm:h-12 sm:w-12" : ""
            } ${
              !compact &&
              (large
                ? "mb-3 h-12 w-12 sm:mb-4 sm:h-16 sm:w-16 md:mb-5 md:h-20 md:w-20 lg:h-24 lg:w-24"
                : "mb-2 h-10 w-10 sm:mb-3 sm:h-12 sm:w-12 md:mb-4 md:h-14 md:w-14")
            }`}
            style={{
              background: `linear-gradient(145deg, ${tech.color}40, ${tech.color}12)`,
              border: `1px solid ${tech.color}55`,
              boxShadow: `0 0 32px ${tech.color}28, inset 0 1px 0 rgba(255,255,255,0.1)`,
            }}
          >
            {tech.icon ? (
              <img
                src={`https://cdn.simpleicons.org/${tech.icon}/${tech.color.replace("#", "")}`}
                alt={tech.name}
                className={`object-contain ${
                  compact
                    ? "h-5 w-5 sm:h-6 sm:w-6"
                    : large
                      ? "h-7 w-7 sm:h-9 sm:w-9 md:h-12 md:w-12 lg:h-14 lg:w-14"
                      : "h-5 w-5 sm:h-7 sm:w-7 md:h-8 md:w-8"
                }`}
                draggable={false}
              />
            ) : (
              <span
                className={`font-mono font-bold ${
                  compact ? "text-xs" : large ? "text-base md:text-xl" : "text-xs sm:text-sm"
                }`}
                style={{ color: tech.color }}
              >
                {tech.fallback}
              </span>
            )}
          </motion.div>

          <h3
            className={`text-electric-gradient text-balance font-display font-bold leading-[1.05] tracking-tight ${
              compact
                ? "text-[clamp(1rem,4.5vw,1.35rem)] sm:text-xl"
                : large
                  ? "text-[clamp(1.35rem,4.5vw,2.75rem)] sm:text-3xl md:text-4xl lg:text-5xl"
                  : "text-[clamp(1rem,3.8vw,1.75rem)] sm:text-2xl md:text-3xl lg:text-4xl"
            }`}
          >
            {tech.name}
          </h3>

          <p
            className={`mx-auto mt-1 line-clamp-2 max-w-[95%] font-light tracking-wide text-white/55 sm:mt-2 md:mt-3 ${
              compact
                ? "text-[10px] sm:text-xs"
                : large
                  ? "text-xs sm:text-sm md:text-base"
                  : "text-[10px] sm:text-xs md:text-sm"
            }`}
          >
            {tech.category}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
