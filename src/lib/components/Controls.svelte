<script lang="ts">
  export let width: number;
  export let height: number;
  export let depth: number;
</script>

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
