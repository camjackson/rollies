<script lang="ts">
  import { onMount } from 'svelte';
  import { Primitive } from 'svelte-cubed';
  import { Object3D } from 'three';

  const object = new Object3D();
  object.name = '_';

  export let children: Object3D[];

  onMount(() => {
    children = object.parent.children.filter((o) => o !== object);
  });
</script>

<Primitive {object}>
  <slot />
</Primitive>
