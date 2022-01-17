<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  import { Canvas, Primitive } from 'svelte-cubed';
  import { Camera, Object3D, Raycaster, Scene, Vector2 } from 'three';
  import { ObjectClickEvent, setThree, ThreeContext } from './getThree';

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

  const clickHandlers: Record<string, (e: ObjectClickEvent) => void> = {};
  const rayCaster = new Raycaster();
  const clickPoint = new Vector2(); // Screen-space coords, range [-1, 1]

  const onClickCanvas = (e: MouseEvent) => {
    // https://stackoverflow.com/questions/12800150/catch-the-click-event-on-a-specific-mesh-in-the-renderer
    const { canvas, scene, camera } = threeContext;
    clickPoint.x = (e.clientX / canvas.clientWidth) * 2 - 1;
    clickPoint.y = -(e.clientY / canvas.clientHeight) * 2 + 1;

    rayCaster.setFromCamera(clickPoint, camera);

    const intersections = rayCaster.intersectObject(scene, true);

    intersections.forEach((intersection) => {
      const handler = clickHandlers[intersection.object.id];
      if (handler) {
        const event: ObjectClickEvent = {};
        handler(event);
      }
    });
  };

  threeContext.onObjectClick = (
    object: Object3D,
    onClick: (e: ObjectClickEvent) => void,
  ) => {
    clickHandlers[object.id] = onClick;
  };

  threeContext.removeOnObjectClick = (object: Object3D) => {
    delete clickHandlers[object.id];
  };

  onMount(() => {
    threeContext.canvas = document.querySelector('canvas');
    threeContext.scene = findScene(object);
    threeContext.camera = findCamera(threeContext.scene);

    threeContext.canvas.addEventListener('click', onClickCanvas);
  });

  onDestroy(() => {
    threeContext.canvas.removeEventListener('click', onClickCanvas);
    for (const key in clickHandlers) delete clickHandlers[key];
  });
</script>

<Primitive {object}>
  <slot />
</Primitive>
