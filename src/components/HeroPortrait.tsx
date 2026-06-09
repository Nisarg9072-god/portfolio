import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

const PORTRAIT_SRC = "/images/hero-portrait.png";

export function HeroPortrait() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), {
    stiffness: 140,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), {
    stiffness: 140,
    damping: 22,
  });
  const glowX = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), {
    stiffness: 80,
    damping: 20,
  });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    const onMove = (e: MouseEvent) => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      mx.set((e.clientX - rect.left) / rect.width - 0.5);
      my.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [mx, my]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: 2.1,
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="hero-portrait-wrap"
      style={{ perspective: 1200 }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="hero-portrait-inner relative flex items-end justify-center"
      >
        <motion.div
          style={{ x: glowX }}
          className="hero-portrait-glow pointer-events-none absolute bottom-[6%] left-1/2 z-0 h-[14%] w-[60%] -translate-x-1/2 rounded-full bg-electric/18 blur-[64px]"
        />

        <img
          src={PORTRAIT_SRC}
          alt="Nisarg Panchal"
          draggable={false}
          className="hero-portrait-img relative z-10"
        />
      </motion.div>
    </motion.div>
  );
}
