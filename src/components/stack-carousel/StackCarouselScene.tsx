import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import type { MutableRefObject } from "react";
import { TechnologyCard } from "./TechnologyCard";
import { ParticleSystem } from "./ParticleSystem";
import { TECHNOLOGIES } from "./technologies";
import {
  AUTO_ROTATE_SPEED,
  getCarouselRadius,
  getFrontIndex,
  lerp,
} from "./carouselMath";

type StackCarouselSceneProps = {
  rotationRef: MutableRefObject<number>;
  targetRotationRef: MutableRefObject<number>;
  isDraggingRef: MutableRefObject<boolean>;
  pauseUntilRef: MutableRefObject<number>;
  displayRotationRef: MutableRefObject<number>;
  onActiveIndexChange: (index: number) => void;
  frozen?: boolean;
};

const ROTATION_LERP = 0.08;

export function StackCarouselScene({
  rotationRef,
  targetRotationRef,
  isDraggingRef,
  pauseUntilRef,
  displayRotationRef,
  onActiveIndexChange,
  frozen = false,
}: StackCarouselSceneProps) {
  const groupRef = useRef<Group>(null);
  const ringRef = useRef<Group>(null);
  const lastActiveRef = useRef(0);

  const total = TECHNOLOGIES.length;
  const radius = getCarouselRadius(total);

  useFrame((state, delta) => {
    const now = performance.now();
    const autoPaused = now < pauseUntilRef.current;

    if (!frozen && !isDraggingRef.current && !autoPaused) {
      targetRotationRef.current -= AUTO_ROTATE_SPEED * delta;
      rotationRef.current = targetRotationRef.current;
    } else if (!isDraggingRef.current) {
      rotationRef.current = lerp(
        rotationRef.current,
        targetRotationRef.current,
        ROTATION_LERP,
      );
    }

    displayRotationRef.current = lerp(
      displayRotationRef.current,
      rotationRef.current,
      0.12,
    );

    if (groupRef.current) {
      groupRef.current.rotation.y = displayRotationRef.current;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.08;
    }

    const front = getFrontIndex(displayRotationRef.current, total);
    if (front !== lastActiveRef.current) {
      lastActiveRef.current = front;
      onActiveIndexChange(front);
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 3, 12]} intensity={0.9} color="#00d4ff" />
      <pointLight position={[-8, 1, 0]} intensity={0.25} color="#6366f1" />
      <pointLight position={[8, 1, 0]} intensity={0.25} color="#00d4ff" />

      <ParticleSystem orbitRadius={radius} />

      <group ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
        <mesh>
          <torusGeometry args={[radius, 0.025, 16, 128]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.12} />
        </mesh>
        <mesh>
          <torusGeometry args={[radius * 1.02, 0.008, 8, 128]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.06} />
        </mesh>
      </group>

      <group ref={groupRef}>
        {TECHNOLOGIES.map((tech, index) => (
          <TechnologyCard
            key={tech.name}
            tech={tech}
            index={index}
            total={total}
            radius={radius}
            displayRotationRef={displayRotationRef}
          />
        ))}
      </group>
    </>
  );
}
