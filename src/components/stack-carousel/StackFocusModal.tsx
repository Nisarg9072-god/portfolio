import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { StackOverviewTable } from "./StackOverviewTable";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function StackFocusModal({ open, onClose }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const handleBackdropClose = useCallback(() => onClose(), [onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div key="stack-focus" className="contents">
          <motion.button
            type="button"
            aria-label="Close stack overview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={handleBackdropClose}
            className="fixed inset-0 z-[200] cursor-pointer border-0 bg-black/55 backdrop-blur-xl"
          />

          <div className="pointer-events-none fixed inset-0 z-[201] flex items-center justify-center overflow-y-auto p-3 sm:p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 28 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto relative my-auto w-[min(96vw,72rem)] max-h-[min(92dvh,780px)]"
            >
              <button
                type="button"
                aria-label="Close"
                data-hover
                onClick={onClose}
                className="absolute top-2 right-2 z-30 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white/80 backdrop-blur-md transition-colors hover:border-electric hover:text-white sm:top-3 sm:right-3 sm:h-10 sm:w-10"
              >
                <X size={16} />
              </button>

              <div className="flex max-h-[min(92dvh,780px)] flex-col overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-b from-white/[0.06] to-transparent p-px shadow-[0_32px_100px_rgba(0,0,0,0.55)] sm:rounded-3xl">
                <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[calc(1rem-1px)] bg-background/80 backdrop-blur-md sm:rounded-[calc(1.5rem-1px)]">
                  <div className="pointer-events-none absolute top-0 left-0 h-14 w-14 rounded-tl-2xl border-t border-l border-electric/25 sm:h-20 sm:w-20 sm:rounded-tl-3xl" />
                  <div className="pointer-events-none absolute top-0 right-0 h-14 w-14 rounded-tr-2xl border-t border-r border-electric/25 sm:h-20 sm:w-20 sm:rounded-tr-3xl" />
                  <div className="pointer-events-none absolute bottom-0 left-0 h-14 w-14 rounded-bl-2xl border-b border-l border-electric/25 sm:h-20 sm:w-20 sm:rounded-bl-3xl" />
                  <div className="pointer-events-none absolute right-0 bottom-0 h-14 w-14 rounded-br-2xl border-r border-b border-electric/25 sm:h-20 sm:w-20 sm:rounded-br-3xl" />

                  <div className="flex min-h-0 flex-1 flex-col p-4 sm:p-5 md:p-6 lg:p-8">
                    <StackOverviewTable />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
