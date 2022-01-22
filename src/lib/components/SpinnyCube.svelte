<script lang="ts">
  import { BoxGeometry, MeshPhongMaterial } from 'three';
  import { Mesh, onFrame, Position } from 'svelte-cubed';
  import {
    MouseEvents,
    ObjectMouseEvent,
    ObjectMouseEventHandler,
  } from '$lib/svelte-trois';

  export let width: number;
  export let height: number;
  export let depth: number;
  export let onMouseMove: ObjectMouseEventHandler;

  let selected = false;
  $: color = selected ? '#5cdb93' : '#77a8f7';

  let position: Position = [0, 0, 0];
  let spin = 0;
  onFrame(() => {
    spin += 0.002;
  });

  const onClick = (e: ObjectMouseEvent) => {
    e.stopPropagation();
    selected = !selected;
  };
</script>

<MouseEvents {onClick} {onMouseMove}>
  <Mesh
    {position}
    rotation={[0, spin, 0]}
    scale={[width, height, depth]}
    geometry={new BoxGeometry()}
    material={new MeshPhongMaterial({ color })}
    castShadow
  />
</MouseEvents>
