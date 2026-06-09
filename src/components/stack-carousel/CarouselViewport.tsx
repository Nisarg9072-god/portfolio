import { Suspense, useEffect, useRef, useState, type RefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StackCarouselScene } from "./StackCarouselScene";
import { CenterHero } from "./CenterHero";
import { getCameraZ, getCarouselRadius } from "./carouselMath";
import { CAROUSEL_COUNT } from "./technologies";
import type { useCarousel } from "./useCarousel";

type CarouselState = ReturnType<typeof useCarousel>;

type Props = {
  carousel: CarouselState;
  heightClass?: string;
  heroSize?: "default" | "large";
  frozen?: boolean;
  showProgress?: boolean;
  hint?: string;
  onTap?: () => void;
  className?: string;
};

const RADIUS = getCarouselRadius(CAROUSEL_COUNT);
const BASE_CAMERA_Z = getCameraZ(RADIUS);

const DEFAULT_HEIGHT =
  "min-h-[300px] h-[clamp(300px,72vw,400px)] sm:min-h-[360px] sm:h-[clamp(360px,52vh,460px)] md:h-[clamp(420px,48vh,500px)] lg:h-[520px]";

function useViewportSize(ref: RefObject<HTMLDivElement | null>) {
  const [size, setSize] = useState({ width: 800, height: 460 });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const update = () => {
      setSize({
        width: node.clientWidth,
        height: node.clientHeight,
      });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(node);
    return () => ro.disconnect();
  }, [ref]);

  return size;
}

function getCameraSettings(
  width: number,
  height: number,
  heroSize: "default" | "large",
) {
  const narrow = width < 400;
  const short = height < 380;
  const fov =
    heroSize === "large"
      ? narrow
        ? 50
        : short
          ? 46
          : 42
      : narrow
        ? 52
        : short
          ? 48
          : 44;

  const zOffset = narrow ? 6 : short ? 3 : 0;

  return {
    position: [0, 0.3, BASE_CAMERA_Z + zOffset] as [number, number, number],
    fov,
  };
}

export function CarouselViewport({
  carousel,
  heightClass = DEFAULT_HEIGHT,
  heroSize = "default",
  frozen = false,
  showProgress = true,
  hint = "Drag or use arrows",
  onTap,
  className = "",
}: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const { width, height } = useViewportSize(viewportRef);
  const camera = getCameraSettings(width, height, heroSize);

  const {
    mounted,
    activeIndex,
    activeTech,
    progress,
    total,
    rotationRef,
    targetRotationRef,
    displayRotationRef,
    isDraggingRef,
    pauseUntilRef,
    goNext,
    goPrev,
    handleActiveChange,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  } = carousel;

  if (!mounted) {
    return (
      <div
        className={`flex items-center justify-center ${heightClass} ${className}`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-electric/20 border-t-electric" />
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Loading toolkit
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full min-w-0 ${className}`}>
      <div
        ref={viewportRef}
        className={`relative w-full ${heightClass} cursor-grab overflow-hidden rounded-xl active:cursor-grabbing sm:rounded-2xl`}
        onPointerDown={(e) => {
          if ((e.target as HTMLElement).closest("[data-carousel-nav]")) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          onPointerDown(e.clientX);
        }}
        onPointerMove={(e) => onPointerMove(e.clientX)}
        onPointerUp={(e) => {
          const wasClick = onPointerUp();
          if (
            wasClick &&
            onTap &&
            !(e.target as HTMLElement).closest("[data-carousel-nav]")
          ) {
            onTap();
          }
        }}
        onPointerCancel={() => onPointerUp()}
      >
        <Canvas
          camera={{ position: camera.position, fov: camera.fov }}
          dpr={[1, heroSize === "large" ? 2 : 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <StackCarouselScene
              rotationRef={rotationRef}
              targetRotationRef={targetRotationRef}
              isDraggingRef={isDraggingRef}
              pauseUntilRef={pauseUntilRef}
              displayRotationRef={displayRotationRef}
              onActiveIndexChange={handleActiveChange}
              frozen={frozen}
            />
          </Suspense>
        </Canvas>

        <CenterHero
          tech={activeTech}
          index={activeIndex}
          total={total}
          size={heroSize}
          compact={height < 400 || width < 380}
        />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(5,5,5,0.42)_100%)] md:bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,5,5,0.5)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-background/70 to-transparent sm:h-16 sm:from-background/80" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-background/70 to-transparent sm:h-20 sm:from-background/80" />

        <button
          type="button"
          data-hover
          data-carousel-nav
          aria-label="Previous technology"
          onClick={goPrev}
          className="glass absolute top-1/2 left-1.5 z-30 flex h-10 w-10 min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full border-white/10 text-white/70 transition-all hover:border-electric/40 hover:text-electric sm:left-3 sm:h-11 sm:w-11 md:left-5 md:h-12 md:w-12"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />
        </button>

        <button
          type="button"
          data-hover
          data-carousel-nav
          aria-label="Next technology"
          onClick={goNext}
          className="glass absolute top-1/2 right-1.5 z-30 flex h-10 w-10 min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full border-white/10 text-white/70 transition-all hover:border-electric/40 hover:text-electric sm:right-3 sm:h-11 sm:w-11 md:right-5 md:h-12 md:w-12"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />
        </button>

        {hint && (
          <p className="pointer-events-none absolute bottom-10 left-1/2 z-20 max-w-[85%] -translate-x-1/2 text-center font-mono text-[10px] uppercase leading-relaxed tracking-[0.15em] text-white/35 sm:bottom-12 sm:max-w-[90%] sm:text-[10px] md:bottom-14 md:text-[11px] md:tracking-[0.22em]">
            {hint}
          </p>
        )}
      </div>

      {showProgress && (
        <div className="mt-4 flex items-center gap-3 px-0.5 sm:mt-6 sm:gap-4">
          <div className="relative h-px flex-1 overflow-hidden rounded-full bg-border/50">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-electric/60 to-electric"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground sm:text-[10px] sm:tracking-[0.2em]">
            {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      )}
    </div>
  );
}
