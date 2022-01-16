<script lang="ts">
  import { Group, Mesh, Primitive } from 'svelte-cubed';
  import { GridHelper, MeshPhongMaterial, PlaneGeometry } from 'three';

  export let height: number;
</script>

<Group position={[0, -height / 2, 0]}>
  <Mesh
    geometry={new PlaneGeometry(50, 50)}
    material={new MeshPhongMaterial({ color: 'burlywood' })}
    rotation={[-Math.PI / 2, 0, 0]}
    receiveShadow
  />
  <Primitive
    object={new GridHelper(50, 50, 0x444444, 0x555555)}
    position={[0, 0.001, 0]}
  />
</Group>
