import { getContext, setContext } from 'svelte';
import type { Camera, Intersection, Object3D, Scene } from 'three';

export type ObjectMouseEvent = {
  domEvent: MouseEvent;
  intersection: Intersection;
  stopPropagation: () => void;
};
export type ObjectMouseEventHandler = (e: ObjectMouseEvent) => void;

export type ThreeContext = {
  canvas: HTMLCanvasElement;
  scene: Scene;
  camera: Camera;

  onObjectClick: (object: Object3D, onClick: ObjectMouseEventHandler) => void;
  onObjectMouseMove: (
    object: Object3D,
    onMouseMove: ObjectMouseEventHandler,
  ) => void;

  removeOnObjectClick: (object: Object3D) => void;
  removeOnObjectMouseMove: (object: Object3D) => void;
};

const key = {};

export const setThree = (three: ThreeContext): void => {
  setContext(key, three);
};

const getThree = (): ThreeContext => {
  return getContext(key);
};

export default getThree;
