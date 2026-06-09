import { useCallback, useEffect, useState } from "react";
import { CarouselViewport } from "./CarouselViewport";
import { StackFocusModal } from "./StackFocusModal";
import { useCarousel } from "./useCarousel";

export function ThreeCarousel() {
  const carousel = useCarousel();
  const [focusOpen, setFocusOpen] = useState(false);
  const [hint, setHint] = useState("Click stack to expand · drag or use arrows");

  const openFocus = useCallback(() => {
    setFocusOpen(true);
  }, []);

  const closeFocus = useCallback(() => {
    setFocusOpen(false);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => {
      setHint(
        mq.matches
          ? "Tap to expand · drag to rotate"
          : "Click stack to expand · drag or use arrows",
      );
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (focusOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") carousel.goPrev();
      if (e.key === "ArrowRight") carousel.goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focusOpen, carousel.goNext, carousel.goPrev]);

  return (
    <>
      <div className={focusOpen ? "invisible" : ""}>
        <CarouselViewport
          carousel={carousel}
          frozen={focusOpen}
          hint={hint}
          onTap={openFocus}
        />
      </div>

      <StackFocusModal
        open={focusOpen}
        initialIndex={carousel.activeIndex}
        onClose={closeFocus}
      />
    </>
  );
}
