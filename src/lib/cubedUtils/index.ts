import type { Position } from 'svelte-cubed/types/common';
import type { Vector3 } from 'three';

export const v3ToPosition = (v3: Vector3): Position => {
  const { x, y, z } = v3;
  return [x, y, z];
};
