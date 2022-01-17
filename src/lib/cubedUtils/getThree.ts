import { getContext, setContext } from 'svelte';
import type { Camera, Object3D, Scene } from 'three';

export type ObjectClickEvent = {
};

export type ThreeContext = {
  canvas: HTMLCanvasElement;
  scene: Scene;
  camera: Camera;

  onObjectClick: (
    object: Object3D,
    onClick: (e: ObjectClickEvent) => void,
  ) => void;
  removeOnObjectClick: (object: Object3D) => void;
};

const key = {};

export const setThree = (three: ThreeContext): void => {
  setContext(key, three);
};

const getThree = (): ThreeContext => {
  return getContext(key);
};

export default getThree;
