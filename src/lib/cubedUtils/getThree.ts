import { getContext, setContext } from 'svelte';
import type { Camera, Scene } from 'three';

export type ThreeContext = {
  canvas: HTMLCanvasElement;
  scene: Scene;
  camera: Camera;
};

const key = {};

export const setThree = (three: ThreeContext): void => {
  setContext(key, three);
};

const getThree = (): ThreeContext => {
  return getContext(key);
};

export default getThree;
