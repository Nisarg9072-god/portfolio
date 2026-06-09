import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, RotateCcw, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ProjectVisual, type ProjectVisualId } from "./ProjectVisual";

export type ProjectData = {
  n: string;
  name: string;
  tag: string;
  desc: string;
  details: string;
  highlights: string[];
  tech: string[];
  accent: string;
  visual: ProjectVisualId;
  github: string;
};

type Props = {
  project: ProjectData;
};

function CardBack({ p }: { p: ProjectData }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden rounded-2xl bg-gradient-to-br sm:rounded-3xl ${p.accent} p-px [backface-visibility:hidden]`}
      style={{ transform: "rotateY(180deg)" }}
    >
      <div className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl bg-card sm:rounded-3xl">
        <div className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-20`} />
        <div className="absolute inset-0 bg-grid opacity-30" />

        <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain p-4 sm:p-6 md:p-8">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 sm:mb-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground sm:text-[10px] sm:tracking-[0.3em]">
              {p.n} — {p.tag}
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-white/50 sm:text-[9px]">
              <RotateCcw size={10} />
              Tap to close
            </span>
          </div>

          <h4 className="font-display text-xl font-bold sm:text-2xl md:text-3xl">
            {p.name}
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-foreground/75 sm:mt-3 sm:text-base">
            {p.details}
          </p>

          <ul className="mt-4 space-y-2 sm:mt-5">
            {p.highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 font-mono text-[10px] uppercase tracking-wide text-foreground/70 sm:text-[11px]"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-electric" />
                <span className="text-balance">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
            {p.tech.map((t) => (
              <span
                key={t}
                className="glass rounded-full px-2.5 py-1 font-mono text-[8px] uppercase tracking-wider text-foreground/80 sm:px-3 sm:text-[9px]"
              >
                {t}
              </span>
            ))}
          </div>

          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            data-hover
            className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3.5 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-electric hover:bg-electric/10 sm:mt-5 sm:px-4 sm:py-2.5 sm:text-[10px] sm:tracking-[0.2em]"
          >
            <Github size={14} />
            View on GitHub
            <ArrowUpRight size={12} className="opacity-60" />
          </a>
        </div>
      </div>
    </div>
  );
}

function FlipFaces({
  p,
  flipped,
  active,
}: {
  p: ProjectData;
  flipped: boolean;
  active: boolean;
}) {
  return (
    <>
      <div
        className="absolute inset-0 h-full w-full [backface-visibility:hidden]"
        style={{ transform: "rotateY(0deg)" }}
      >
        <ProjectVisual
          id={p.visual}
          name={p.name}
          tag={p.tag}
          index={p.n}
          accent={p.accent}
          active={active && !flipped}
        />
      </div>
      <CardBack p={p} />
    </>
  );
}

export function ProjectFlipCard({ project: p }: Props) {
  const [open, setOpen] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => {
    setFlipped(false);
    window.setTimeout(() => setOpen(false), 520);
  }, []);

  const openCard = useCallback(() => {
    setOpen(true);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setFlipped(true));
    });
  }, []);

  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const flipTransition = { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const };
  const layoutTransition = { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <>
      <div className={`w-full ${open ? "invisible" : ""}`}>
        <div
          role="button"
          tabIndex={0}
          aria-label={`View ${p.name} details`}
          onClick={openCard}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openCard();
            }
          }}
          data-hover
          className="group relative aspect-[4/3] w-full cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-electric/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ProjectVisual
            id={p.visual}
            name={p.name}
            tag={p.tag}
            index={p.n}
            accent={p.accent}
            active={!open}
          />
          <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/60 opacity-80 backdrop-blur-sm sm:bottom-4 sm:px-4 sm:py-1.5 sm:text-[9px] sm:opacity-0 sm:group-hover:opacity-100">
            Tap to explore
          </div>
        </div>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div key={`project-modal-${p.name}`} className="contents">
                <motion.button
                  type="button"
                  aria-label="Close project details"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={close}
                  className="fixed inset-0 z-[200] cursor-pointer border-0 bg-black/55 backdrop-blur-xl"
                />

                <div className="pointer-events-none fixed inset-0 z-[201] flex items-center justify-center overflow-y-auto p-3 sm:p-6 md:p-10">
                  <motion.div
                    layout
                    role="button"
                    tabIndex={0}
                    aria-label={`Close ${p.name} details`}
                    initial={{ opacity: 0, scale: 0.9, y: 24 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: 16 }}
                    transition={{
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                      layout: layoutTransition,
                    }}
                    onClick={close}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        close();
                      }
                    }}
                    className={`group pointer-events-auto relative my-auto w-[min(94vw,42rem)] max-w-full cursor-pointer [perspective:1400px] outline-none focus-visible:ring-2 focus-visible:ring-electric/60 ${
                      flipped
                        ? "h-[min(88dvh,680px)]"
                        : "aspect-[4/3] h-auto max-h-[min(72dvh,36rem)]"
                    }`}
                  >
                    <button
                      type="button"
                      aria-label="Close"
                      onClick={(e) => {
                        e.stopPropagation();
                        close();
                      }}
                      className="absolute top-2 right-2 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white/80 backdrop-blur-md transition-colors hover:border-electric hover:text-white sm:top-3 sm:right-3 sm:h-9 sm:w-9"
                    >
                      <X size={16} />
                    </button>

                    <motion.div
                      animate={{ rotateY: flipped ? 180 : 0 }}
                      transition={flipTransition}
                      style={{ transformStyle: "preserve-3d" }}
                      className="relative h-full w-full min-h-0"
                    >
                      <FlipFaces p={p} flipped={flipped} active={open} />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
