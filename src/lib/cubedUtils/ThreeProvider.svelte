<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  import { Primitive } from 'svelte-cubed';
  import {
    Camera,
    Intersection,
    Object3D,
    Raycaster,
    Scene,
    Vector2,
  } from 'three';
  import { ObjectMouseEventHandler, setThree, ThreeContext } from './getThree';

  const threeContext = {} as ThreeContext;
  setThree(threeContext);

  const object = new Object3D();

  const findScene = (object: Object3D): Scene => {
    let rootNode = object;
    while (rootNode.parent) {
      rootNode = rootNode.parent;
    }
    if (rootNode.type !== 'Scene') {
      throw new Error('Root node of the scene is not a Scene');
    }
    return rootNode as Scene;
  };

  const findCamera = (
    object: Object3D,
    throwOnNull: boolean = true,
  ): Camera | null => {
    if (object.type.endsWith('Camera')) {
      return object as Camera;
    }

    for (let child of object.children) {
      const childCamera = findCamera(child, false);
      if (childCamera) {
        return childCamera;
      }
    }

    if (throwOnNull) {
      throw new Error('Unable to find a camera in the scene');
    }
  };

  const clickHandlers = new Map<Object3D, ObjectMouseEventHandler>();
  const mouseMoveHandlers = new Map<Object3D, ObjectMouseEventHandler>();
  const rayCaster = new Raycaster();
  const clickPoint = new Vector2(); // Screen-space coords, range [-1, 1]

  const castRay = (e: MouseEvent, objects: Object3D[]): Intersection[] => {
    // https://stackoverflow.com/questions/12800150/catch-the-click-event-on-a-specific-mesh-in-the-renderer
    const { canvas, camera } = threeContext;
    clickPoint.x = (e.clientX / canvas.clientWidth) * 2 - 1;
    clickPoint.y = -(e.clientY / canvas.clientHeight) * 2 + 1;

    rayCaster.setFromCamera(clickPoint, camera);

    const intersections = rayCaster.intersectObjects(objects);

    return intersections;
  };

  const onMouseEvent =
    (handlers: Map<Object3D, ObjectMouseEventHandler>) =>
    (domEvent: MouseEvent) => {
      const intersections = castRay(domEvent, Array.from(handlers.keys()));

      let stopped = false;
      const stopPropagation = () => {
        stopped = true;
      };
      intersections.forEach((intersection) => {
        if (stopped) return;
        handlers.get(intersection.object)({
          domEvent,
          intersection,
          stopPropagation,
        });
      });
    };

  const onClickCanvas = onMouseEvent(clickHandlers);
  const onMouseMoveCanvas = onMouseEvent(mouseMoveHandlers);

  // TODO: Find a way to de-dupe this code and make it work for lots of different events
  threeContext.onObjectClick = (
    object: Object3D,
    onClick: ObjectMouseEventHandler,
  ) => {
    clickHandlers.set(object, onClick);
  };
  threeContext.onObjectMouseMove = (
    object: Object3D,
    onMouseMove: ObjectMouseEventHandler,
  ) => {
    mouseMoveHandlers.set(object, onMouseMove);
  };

  threeContext.removeOnObjectClick = (object: Object3D) => {
    clickHandlers.delete(object);
  };
  threeContext.removeOnObjectMouseMove = (object: Object3D) => {
    mouseMoveHandlers.delete(object);
  };

  onMount(() => {
    threeContext.canvas = document.querySelector('canvas');
    threeContext.scene = findScene(object);
    threeContext.camera = findCamera(threeContext.scene);

    threeContext.canvas.addEventListener('click', onClickCanvas);
    threeContext.canvas.addEventListener('mousemove', onMouseMoveCanvas);
  });

  onDestroy(() => {
    threeContext.canvas.removeEventListener('click', onClickCanvas);
    threeContext.canvas.removeEventListener('mousemove', onMouseMoveCanvas);
    clickHandlers.clear();
  });
</script>

<Primitive {object}>
  <slot />
</Primitive>
