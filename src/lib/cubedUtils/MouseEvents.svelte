<script lang="ts">
  import { onMount } from 'svelte';
  import type { Object3D } from 'three';
  import getThree, { ObjectMouseEventHandler } from './getThree';
  import GetChild from './GetChild.svelte';

  export let onClick: ObjectMouseEventHandler | undefined = undefined;
  export let onMouseMove: ObjectMouseEventHandler | undefined = undefined;

  const three = getThree();
  let child: Object3D;

  onMount(() => {
    if (onClick) three.onObjectClick(child, onClick);
    if (onMouseMove) three.onObjectMouseMove(child, onMouseMove);
  });
</script>

<GetChild bind:child>
  <slot />
</GetChild>
