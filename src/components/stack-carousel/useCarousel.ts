import { useCallback, useEffect, useRef, useState } from "react";
import { CAROUSEL_COUNT, TECHNOLOGIES } from "./technologies";
import { indexToRotation, rotationToIndex } from "./carouselMath";

const TOTAL = CAROUSEL_COUNT;
const DRAG_SENSITIVITY = 0.004;
const PAUSE_MS = 4000;
const CLICK_THRESHOLD = 10;

export function useCarousel(initialIndex = 0) {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const rotationRef = useRef(indexToRotation(initialIndex, TOTAL));
  const targetRotationRef = useRef(indexToRotation(initialIndex, TOTAL));
  const displayRotationRef = useRef(indexToRotation(initialIndex, TOTAL));
  const isDraggingRef = useRef(false);
  const pauseUntilRef = useRef(0);
  const dragDistanceRef = useRef(0);

  const dragStart = useRef({ x: 0, rotation: 0 });

  useEffect(() => setMounted(true), []);

  const pauseAuto = useCallback((ms = PAUSE_MS) => {
    pauseUntilRef.current = performance.now() + ms;
  }, []);

  const goToIndex = useCallback(
    (index: number) => {
      const normalized = ((index % TOTAL) + TOTAL) % TOTAL;
      const target = indexToRotation(normalized, TOTAL);
      setActiveIndex(normalized);
      targetRotationRef.current = target;
      rotationRef.current = target;
      displayRotationRef.current = target;
      pauseAuto();
    },
    [pauseAuto],
  );

  const syncToIndex = useCallback((index: number) => {
    const normalized = ((index % TOTAL) + TOTAL) % TOTAL;
    const target = indexToRotation(normalized, TOTAL);
    setActiveIndex(normalized);
    targetRotationRef.current = target;
    rotationRef.current = target;
    displayRotationRef.current = target;
  }, []);

  const handleActiveChange = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const goNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      e?.preventDefault();
      goToIndex(activeIndex + 1);
    },
    [activeIndex, goToIndex],
  );

  const goPrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      e?.preventDefault();
      goToIndex(activeIndex - 1);
    },
    [activeIndex, goToIndex],
  );

  const onPointerDown = useCallback(
    (clientX: number) => {
      isDraggingRef.current = true;
      dragDistanceRef.current = 0;
      pauseAuto();
      dragStart.current = { x: clientX, rotation: rotationRef.current };
    },
    [pauseAuto],
  );

  const onPointerMove = useCallback((clientX: number) => {
    if (!isDraggingRef.current) return;
    const dx = clientX - dragStart.current.x;
    dragDistanceRef.current = Math.max(
      dragDistanceRef.current,
      Math.abs(dx),
    );
    rotationRef.current = dragStart.current.rotation + dx * DRAG_SENSITIVITY;
    targetRotationRef.current = rotationRef.current;
  }, []);

  const onPointerUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const nearest = rotationToIndex(rotationRef.current, TOTAL);
    goToIndex(nearest);
    return dragDistanceRef.current < CLICK_THRESHOLD;
  }, [goToIndex]);

  const activeTech = TECHNOLOGIES[activeIndex];
  const progress = ((activeIndex + 1) / TOTAL) * 100;

  return {
    mounted,
    activeIndex,
    activeTech,
    progress,
    total: TOTAL,
    rotationRef,
    targetRotationRef,
    displayRotationRef,
    isDraggingRef,
    pauseUntilRef,
    goNext,
    goPrev,
    goToIndex,
    syncToIndex,
    handleActiveChange,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  };
}
