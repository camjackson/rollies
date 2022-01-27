<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import type { Object3D } from 'three';
  import { getTroisInternalContext, ObjectMouseEventHandler } from './context';
  import GetChild from './GetChild.svelte';

  export let onClick: ObjectMouseEventHandler | undefined = undefined;
  export let onMouseMove: ObjectMouseEventHandler | undefined = undefined;

  const trois = getTroisInternalContext();
  let child: Object3D;

  onMount(() => {
    if (onClick) trois.onObjectClick(child, onClick);
    if (onMouseMove) trois.onObjectMouseMove(child, onMouseMove);
  });

  onDestroy(() => {
    if (onClick) trois.removeOnObjectClick(child);
    if (onMouseMove) trois.removeOnObjectMouseMove(child);
  });
</script>

<GetChild bind:child>
  <slot />
</GetChild>
