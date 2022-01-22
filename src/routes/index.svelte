<script lang="ts">
  import { Color, FogExp2 } from 'three';
  import { Canvas } from 'svelte-cubed';
  import { TroisProvider } from '$lib/svelte-trois';

  import App from '$lib/components/App.svelte';
  import Controls from '$lib/components/Controls.svelte';

  let width = 1;
  let height = 1;
  let depth = 1;
</script>

<div>
  <Canvas
    antialias
    background={new Color('grey')}
    shadows
    fog={new FogExp2('papayawhip', 0.08)}
  >
    <TroisProvider>
      <App {width} {height} {depth} />
    </TroisProvider>
    <Controls bind:width bind:depth bind:height />
  </Canvas>
</div>
