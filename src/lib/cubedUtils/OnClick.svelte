<script lang="ts">
  import { onMount } from 'svelte';
  import type { Object3D } from 'three';
  import getThree, { ObjectClickEvent } from './getThree';
  import GetChild from './GetChild.svelte';

  export let onClick: (e: ObjectClickEvent) => void;

  const three = getThree();
  let child: Object3D;

  onMount(() => {
    three.onObjectClick(child, onClick);
  });
</script>

<GetChild bind:child>
  <slot />
</GetChild>
