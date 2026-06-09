import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 60;

function createTriangleGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.06);
  shape.lineTo(-0.045, -0.04);
  shape.lineTo(0.045, -0.04);
  shape.closePath();
  return new THREE.ShapeGeometry(shape);
}

type ParticleSystemProps = {
  orbitRadius: number;
};

export function ParticleSystem({ orbitRadius }: ParticleSystemProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const geometry = useMemo(() => createTriangleGeometry(), []);

  const particles = useMemo(() => {
    const spread = orbitRadius * 2.2;
    return Array.from({ length: COUNT }, () => ({
      x: (Math.random() - 0.5) * spread,
      y: (Math.random() - 0.5) * 6,
      z: (Math.random() - 0.5) * spread * 0.5,
      rot: Math.random() * Math.PI * 2,
      speed: 0.1 + Math.random() * 0.25,
      phase: Math.random() * Math.PI * 2,
      size: 0.5 + Math.random() * 0.5,
    }));
  }, [orbitRadius]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    particles.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(t * p.speed + p.phase) * 0.25,
        p.y + Math.cos(t * p.speed * 0.5 + p.phase) * 0.15,
        p.z,
      );
      dummy.rotation.z = p.rot + t * 0.1;
      dummy.scale.setScalar(p.size);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, undefined, COUNT]}
      frustumCulled={false}
    >
      <meshBasicMaterial
        color="#00d4ff"
        transparent
        opacity={0.08}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </instancedMesh>
  );
}
