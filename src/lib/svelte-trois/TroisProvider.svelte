<script lang="ts">
  import { onMount } from 'svelte';

  import { Primitive } from 'svelte-cubed';
  import { Object3D } from 'three';
  import {
    TroisContext,
    setTroisContext,
    setTroisInternalContext,
  } from './context';
  import {
    onObjectClick,
    onObjectMouseMove,
    removeOnObjectClick,
    removeOnObjectMouseMove,
    TroisCaster,
  } from './raycast';
  import { findCamera, findScene } from './traverse';

  const troisContext = {} as TroisContext;
  setTroisContext(troisContext);

  setTroisInternalContext({
    onObjectClick,
    onObjectMouseMove,
    removeOnObjectClick,
    removeOnObjectMouseMove,
  });

  let caster: TroisCaster;

  // Injected into the scene so we have a starting point to traverse from
  const object = new Object3D();
  onMount(() => {
    troisContext.canvas = document.querySelector('canvas');
    troisContext.scene = findScene(object);
    troisContext.camera = findCamera(troisContext.scene);

    caster = new TroisCaster(troisContext.canvas, troisContext.camera);
    return caster.attach();
  });
</script>

<Primitive {object}>
  <slot />
</Primitive>
