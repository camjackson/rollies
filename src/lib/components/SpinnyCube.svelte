<script lang="ts">
  import { BoxGeometry, MeshPhongMaterial, Object3D } from 'three';
  import { Mesh, onFrame, Position } from 'svelte-cubed';
  import getThree from '../cubedUtils/getThree';
  import GetChild from '$lib/cubedUtils/GetChild.svelte';
  import { onMount } from 'svelte';

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
  let mesh: Object3D;

  onMount(() => {
    threeContext.onObjectClick(mesh, (e) => {
      selected = !selected;
    });
  });
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
