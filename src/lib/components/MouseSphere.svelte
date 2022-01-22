<script lang="ts">
  import { Mesh } from 'svelte-cubed';

  import type { Position } from 'svelte-cubed/types/common';
  import { MeshPhongMaterial, SphereGeometry } from 'three';

  export let position: Position;

  const color = 'purple';
</script>

<Mesh
  {position}
  scale={0.03}
  geometry={new SphereGeometry()}
  material={new MeshPhongMaterial({ color })}
  castShadow
/>
