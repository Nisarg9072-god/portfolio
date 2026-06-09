import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Loader() {
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      setPct(100);
      setDone(true);
      return;
    }

    let i = 0;
    const t = setInterval(() => {
      i += Math.random() * 12 + 4;
      if (i >= 100) {
        i = 100;
        clearInterval(t);
        setTimeout(() => setDone(true), 300);
      }
      setPct(Math.floor(i));
    }, 80);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setHidden(true), 1200);
    return () => clearTimeout(t);
  }, [done]);

  if (hidden) return null;

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={done ? { y: "-100%" } : {}}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className={`fixed inset-0 z-[10000] flex items-end justify-between bg-[#050505] px-6 pb-10 md:px-12 ${
        done ? "pointer-events-none" : ""
      }`}
      aria-hidden={done}
    >
      <div className="font-display text-[20vw] leading-none font-bold text-white/5">
        {String(pct).padStart(3, "0")}
      </div>
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Initializing experience
      </div>
    </motion.div>
  );
}
