import { getContext, setContext } from 'svelte';
import type { Camera, Intersection, Object3D, Scene } from 'three';

export type ObjectMouseEvent = {
  domEvent: MouseEvent;
  intersection: Intersection;
  stopPropagation: () => void;
};
export type ObjectMouseEventHandler = (e: ObjectMouseEvent) => void;

export type TroisContext = {
  canvas: HTMLCanvasElement;
  scene: Scene;
  camera: Camera;
};

export type TroisInternalContext = {
  onObjectClick: (object: Object3D, onClick: ObjectMouseEventHandler) => void;
  onObjectMouseMove: (
    object: Object3D,
    onMouseMove: ObjectMouseEventHandler,
  ) => void;

  removeOnObjectClick: (object: Object3D) => void;
  removeOnObjectMouseMove: (object: Object3D) => void;
};

const troisContextKey = {};
const troisInternalContextKey = {};

export const getTroisContext = (): TroisContext => getContext(troisContextKey);
export const getTroisInternalContext = (): TroisInternalContext =>
  getContext(troisInternalContextKey);

export const setTroisContext = (troiContext: TroisContext): void =>
  setContext(troisContextKey, troiContext);

export const setTroisInternalContext = (
  troisInternalContext: TroisInternalContext,
): void => setContext(troisInternalContextKey, troisInternalContext);
