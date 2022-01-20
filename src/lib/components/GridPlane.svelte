<script lang="ts">
  import { Group, Mesh, Primitive } from 'svelte-cubed';
  import { GridHelper, MeshPhongMaterial, PlaneGeometry } from 'three';
  import OnClick from '$lib/cubedUtils/OnClick.svelte';

  export let height: number;

  let state = true;
  $: color = state ? 'burlywood' : '#fbb3ff';

  const toggle = () => {
    state = !state;
  };
</script>

<Group position={[0, -height / 2, 0]}>
  <OnClick onClick={toggle}>
    <Mesh
      geometry={new PlaneGeometry(50, 50)}
      material={new MeshPhongMaterial({ color })}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    />
  </OnClick>
  <Primitive
    object={new GridHelper(50, 50, 0x444444, 0x555555)}
    position={[0, 0.001, 0]}
  />
</Group>
