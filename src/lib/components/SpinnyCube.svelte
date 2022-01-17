<script lang="ts">
  import { BoxGeometry, MeshPhongMaterial, Object3D } from 'three';
  import { Mesh, onFrame, Position } from 'svelte-cubed';
  import type { ObjectClickEvent } from '../cubedUtils/getThree';
  import OnClick from '$lib/cubedUtils/OnClick.svelte';

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

  const onClick = (e: ObjectClickEvent) => {
    selected = !selected;
  };
</script>

<OnClick {onClick}>
  <Mesh
    {position}
    rotation={[0, spin, 0]}
    scale={[width, height, depth]}
    geometry={new BoxGeometry()}
    material={new MeshPhongMaterial({ color })}
    castShadow
  />
</OnClick>
