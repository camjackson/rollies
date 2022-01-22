import type { Object3D, Scene, Camera } from 'three';

export const findScene = (object: Object3D): Scene => {
  let rootNode = object;
  while (rootNode.parent) {
    rootNode = rootNode.parent;
  }
  if (rootNode.type !== 'Scene') {
    throw new Error('Root node of the scene is not a Scene');
  }
  return rootNode as Scene;
};

export const findCamera = (
  object: Object3D,
  throwOnNull = true,
): Camera | null => {
  if (object.type.endsWith('Camera')) {
    return object as Camera;
  }

  for (const child of object.children) {
    const childCamera = findCamera(child, false);
    if (childCamera) {
      return childCamera;
    }
  }

  if (throwOnNull) {
    throw new Error('Unable to find a camera in the scene');
  }
};
