import type { Position } from 'svelte-cubed/types/common';
import type { Vector3 } from 'three';
import { getTroisContext } from './context';
export type {
  TroisContext,
  ObjectMouseEvent,
  ObjectMouseEventHandler,
} from './context';

export { default as TroisProvider } from './TroisProvider.svelte';
export { default as MouseEvents } from './MouseEvents.svelte';
export { default as GetChild } from './GetChild.svelte';
export { default as GetChildren } from './GetChildren.svelte';

export const v3ToPosition = (v3: Vector3): Position => {
  const { x, y, z } = v3;
  return [x, y, z];
};

export const getTrois = getTroisContext;
