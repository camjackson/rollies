<script lang="ts">
  import {
    AmbientLight,
    DirectionalLight,
    OrbitControls,
    PerspectiveCamera,
  } from 'svelte-cubed';

  import GridPlane from './GridPlane.svelte';
  import SpinnyCube from './SpinnyCube.svelte';

  export let width: number;
  export let height: number;
  export let depth: number;

  export let castRay: (event: MouseEvent) => void;
</script>

<PerspectiveCamera position={[1, 1, 3]} />
<OrbitControls maxPolarAngle={Math.PI * 0.51} />
<AmbientLight intensity={0.6} />
<DirectionalLight
  intensity={0.6}
  position={[-2, 3, 2]}
  shadow={{ mapSize: [2048, 2048] }}
/>
<SpinnyCube {width} {height} {depth} bind:castRay />
<GridPlane {height} />
