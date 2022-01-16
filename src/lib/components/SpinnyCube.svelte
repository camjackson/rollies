<script lang="ts">
  import {
    BoxGeometry,
    MeshPhongMaterial,
    Object3D,
    Raycaster,
    Vector2,
  } from 'three';
  import { Mesh, onFrame, Position } from 'svelte-cubed';
  import getThree from '../cubedUtils/getThree';
  import GetChild from '$lib/cubedUtils/GetChild.svelte';

  export let width: number;
  export let height: number;
  export let depth: number;

  let selected = false;
  $: color = selected ? '#5cdb93' : '#77a8f7';

  let position: Position = [0, 0, 0];
  let spin = 0;
  onFrame(() => {
    spin += 0.002;
  });

  const threeContext = getThree();
  const rayCaster = new Raycaster();
  const clickPoint = new Vector2(); // Screen-space coords, range [-1, 1]
  let mesh: Object3D;

  export const castRay = (event: MouseEvent) => {
    // https://stackoverflow.com/questions/12800150/catch-the-click-event-on-a-specific-mesh-in-the-renderer
    const { camera, canvas } = threeContext;
    clickPoint.x = (event.clientX / canvas.clientWidth) * 2 - 1;
    clickPoint.y = -(event.clientY / canvas.clientHeight) * 2 + 1;

    rayCaster.setFromCamera(clickPoint, camera);

    const intersections = rayCaster.intersectObject(mesh, true);

    if (intersections.length > 0) {
      selected = !selected;
    }
  };
</script>

<GetChild bind:child={mesh}>
  <Mesh
    {position}
    rotation={[0, spin, 0]}
    scale={[width, height, depth]}
    geometry={new BoxGeometry()}
    material={new MeshPhongMaterial({ color })}
    castShadow
  />
</GetChild>
