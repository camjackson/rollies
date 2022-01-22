<script lang="ts">
  import {
    AmbientLight,
    DirectionalLight,
    OrbitControls,
    PerspectiveCamera,
  } from 'svelte-cubed';
  import type { Position } from 'svelte-cubed/types/common';
  import { v3ToPosition, ObjectMouseEvent } from '$lib/svelte-trois';

  import GridPlane from './GridPlane.svelte';
  import MouseSphere from './MouseSphere.svelte';
  import SpinnyCube from './SpinnyCube.svelte';

  export let width: number;
  export let height: number;
  export let depth: number;

  let mouse3dPosition: Position = [0, 0, 0];

  const onMouseMove = (e: ObjectMouseEvent) => {
    e.stopPropagation();
    mouse3dPosition = v3ToPosition(e.intersection.point);
  };
</script>

<PerspectiveCamera position={[1, 1, 3]} />
<OrbitControls maxPolarAngle={Math.PI * 0.51} />
<AmbientLight intensity={0.6} />
<DirectionalLight
  intensity={0.6}
  position={[-2, 3, 2]}
  shadow={{ mapSize: [2048, 2048] }}
/>
<SpinnyCube {width} {height} {depth} {onMouseMove} />
<GridPlane {height} {onMouseMove} />
<MouseSphere position={mouse3dPosition} />
