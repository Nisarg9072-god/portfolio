export const AUTO_ROTATE_SPEED = 0.035;

export function getCarouselRadius(totalCards: number): number {
  return Math.max(totalCards * 0.68, 15);
}

export function getCardAngle(index: number, totalCards: number): number {
  return index * ((2 * Math.PI) / totalCards);
}

export function getCarouselStep(totalCards: number): number {
  return (2 * Math.PI) / totalCards;
}

export function indexToRotation(index: number, totalCards: number): number {
  return -index * getCarouselStep(totalCards);
}

export function rotationToIndex(
  rotation: number,
  totalCards: number,
): number {
  const step = getCarouselStep(totalCards);
  const idx = Math.round(-rotation / step);
  return ((idx % totalCards) + totalCards) % totalCards;
}

export function getWorldZ(
  index: number,
  totalCards: number,
  groupRotation: number,
  radius: number,
): number {
  const angle = getCardAngle(index, totalCards);
  return Math.cos(angle + groupRotation) * radius;
}

export function getFrontIndex(
  groupRotation: number,
  totalCards: number,
): number {
  const radius = getCarouselRadius(totalCards);
  let bestIndex = 0;
  let bestZ = -Infinity;

  for (let i = 0; i < totalCards; i++) {
    const z = getWorldZ(i, totalCards, groupRotation, radius);
    if (z > bestZ) {
      bestZ = z;
      bestIndex = i;
    }
  }

  return bestIndex;
}

export function getNeighborIndices(frontIndex: number, totalCards: number) {
  return {
    left: (frontIndex - 1 + totalCards) % totalCards,
    right: (frontIndex + 1) % totalCards,
  };
}

export type StackSlot = "center" | "left" | "right" | "back";

export function getStackSlot(
  index: number,
  frontIndex: number,
  totalCards: number,
): StackSlot {
  if (index === frontIndex) return "center";
  const { left, right } = getNeighborIndices(frontIndex, totalCards);
  if (index === left) return "left";
  if (index === right) return "right";
  return "back";
}

export type OrbitVisuals = {
  scale: number;
  opacity: number;
  fontSize: number;
  visible: boolean;
};

export function slotToVisuals(slot: StackSlot): OrbitVisuals {
  return { scale: 0, opacity: 0, fontSize: 0, visible: false };
}

export function getCameraZ(radius: number): number {
  return radius * 2.9 + 16;
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
