<script lang="ts">
  import {
    BoxGeometry,
    Color,
    FogExp2,
    GridHelper,
    MeshPhongMaterial,
    PlaneGeometry,
  } from 'three';
  import {
    AmbientLight,
    Canvas,
    DirectionalLight,
    Group,
    Mesh,
    onFrame,
    OrbitControls,
    PerspectiveCamera,
    Primitive,
  } from 'svelte-cubed';

  let width = 1;
  let height = 1;
  let depth = 1;

  let spin = 0;

  onFrame(() => {
    spin += 0.01;
  });
</script>

<Canvas
  antialias
  background={new Color('grey')}
  shadows
  fog={new FogExp2('papayawhip', 0.08)}
>
  <Mesh
    scale={[width, height, depth]}
    geometry={new BoxGeometry()}
    material={new MeshPhongMaterial({ color: '#77a8f7' })}
    rotation={[0, spin, 0]}
    castShadow
  />
  <PerspectiveCamera position={[1, 1, 3]} />
  <OrbitControls maxPolarAngle={Math.PI * 0.51} />
  <AmbientLight intensity={0.6} />
  <DirectionalLight
    intensity={0.6}
    position={[-2, 3, 2]}
    shadow={{ mapSize: [2048, 2048] }}
  />

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
</Canvas>

<div class="controls">
  <label>
    <input type="range" bind:value={width} min={0.1} max={3} step={0.1} /> width
  </label>
  <label>
    <input type="range" bind:value={height} min={0.1} max={3} step={0.1} /> height
  </label>
  <label>
    <input type="range" bind:value={depth} min={0.1} max={3} step={0.1} /> depth
  </label>
</div>

<style>
  .controls {
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 5px;
    border: 1px solid black;
  }
</style>
