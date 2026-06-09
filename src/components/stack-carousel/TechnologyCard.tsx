import { useRef } from "react";
import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import type { Group } from "three";
import type { MutableRefObject } from "react";
import type { Technology } from "./technologies";
import {
  getCardAngle,
  getFrontIndex,
  getStackSlot,
  lerp,
  slotToVisuals,
} from "./carouselMath";

type TechnologyCardProps = {
  tech: Technology;
  index: number;
  total: number;
  radius: number;
  displayRotationRef: MutableRefObject<number>;
};

export function TechnologyCard({
  tech,
  index,
  total,
  radius,
  displayRotationRef,
}: TechnologyCardProps) {
  const groupRef = useRef<Group>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const smoothOpacity = useRef(0);
  const smoothScale = useRef(0.001);
  const { camera } = useThree();

  const angle = getCardAngle(index, total);
  const baseX = Math.sin(angle) * radius;
  const baseZ = Math.cos(angle) * radius;

  useFrame((state) => {
    if (!groupRef.current || !cardRef.current) return;

    const rotation = displayRotationRef.current;
    const frontIndex = getFrontIndex(rotation, total);
    const slot = getStackSlot(index, frontIndex, total);
    const target = slotToVisuals(slot);

    smoothOpacity.current = lerp(smoothOpacity.current, target.opacity, 0.12);
    smoothScale.current = lerp(
      smoothScale.current,
      target.visible ? target.scale : 0.001,
      0.1,
    );

    const floatY =
      slot === "left" || slot === "right"
        ? Math.sin(state.clock.elapsedTime * 1.1 + index) * 0.05
        : 0;

    groupRef.current.position.set(baseX, floatY, baseZ);
    groupRef.current.scale.setScalar(smoothScale.current);
    groupRef.current.lookAt(camera.position);
    groupRef.current.rotation.set(0, groupRef.current.rotation.y, 0);

    const visible = smoothOpacity.current > 0.05;
    cardRef.current.style.display = visible ? "flex" : "none";
    cardRef.current.style.opacity = String(smoothOpacity.current);
    cardRef.current.style.transform = `translateY(${floatY * 2}px)`;
  });

  return (
    <group ref={groupRef}>
      <Html
        transform
        center
        distanceFactor={20}
        zIndexRange={[0, 8]}
        style={{ pointerEvents: "none" }}
      >
        <div
          ref={cardRef}
          className="glass flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          style={{ display: "none" }}
        >
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
            style={{
              background: `linear-gradient(145deg, ${tech.color}35, ${tech.color}10)`,
              border: `1px solid ${tech.color}40`,
            }}
          >
            {tech.icon ? (
              <img
                src={`https://cdn.simpleicons.org/${tech.icon}/${tech.color.replace("#", "")}`}
                alt=""
                className="h-5 w-5 object-contain"
                draggable={false}
              />
            ) : (
              <span
                className="font-mono text-[10px] font-bold"
                style={{ color: tech.color }}
              >
                {tech.fallback}
              </span>
            )}
          </div>
          <span className="max-w-[120px] truncate font-display text-sm font-semibold text-white/90">
            {tech.name}
          </span>
        </div>
      </Html>
    </group>
  );
}
