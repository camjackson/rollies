# svelte-trois

[`svelte-cubed`](https://svelte-cubed.vercel.app/) is great! But it's also very new.

There are lots of things that it can't do yet, including basic stuff like mouse
events. This library is an attempt to fill some of those gaps without having to
fork `svelte-cubed` itself.

As `svelte-cubed` becomes more mature and has fewer 'missing' features, maybe this
library will become a collection of higher-level helpers that don't belong in the
core `svelte-cubed` library, à la [`drei`](https://github.com/pmndrs/drei).

## Getting started

1. Install using your favourite package manager:

```sh
npm i svelte-trois
# OR
yarn add svelte-trois
```

2. Add the `TroisProvider` to the root of your `svelte-cubed` app, right underneath
   the `Canvas` component:

```svelte
<script lang="ts">
  import { Canvas } from 'svelte-cubed';
  import { TroisProvider } from 'svelte-trois';

  import My3DApp from './My3DApp.svelte';
</script>

<Canvas>
  <TroisProvider>
    <My3DApp />
  </TroisProvider>
</Canvas>
```

Now you're ready to use any of the other utilities and components below!

## API

### `<TroisProvider>`

See [Getting started](#getting-started) above.

### `getTrois(): TroisContext`

Retrives the context object provided by the above provider. The object contains:

- `canvas: HTMLCanvasElement`: The canvas in the DOM where this app is running
- `scene: THREE.Scene`: The three.js scene created by `svelte-cubed`
- `camera: THREE.Camera`: The three.js camera created by `svelte-cubed`

### `v3ToPosition(v3: THREE.Vector3): SvelteCubed.Position`

Simple helper function for converting between vector representations.

### `<MouseEvents>`

A component that allows you to attach mouse events to its child. Supports the following events:

- `onClick?: (e: ObjectMouseEvent): void`
- `onMouseMove?: (e: ObjectMouseEvent): void`

The event contains the following properties:

- `domEvent: MouseEvent`: The native DOM event from the canvas element
- `intersection: THREE.Intersection`: The three.js intersection object
- `stopPropagation: () => void`: A function to prevent the event from 'bubbling'
  any further away from the camera\*. This does _not_ call `stopPropagation` on the DOM event - you can
  do that yourself if you need to.

\* If the mouse is over multiple listening objects, then all of their listeners
will be called, in order, starting from the object nearest the camera. If you
want to prevent objects in the background from receiving mouse events, then have
the foreground listener call `e.stopPropagation()`.

Example usage:

```svelte
<script lang="ts">
  import { BoxGeometry } from 'three';
  import { Mesh, onFrame, Position } from 'svelte-cubed';
  import { MouseEvents } from 'svelte-trois';

  const onClick = (e) => {
    e.stopPropagation(); // Don't click things behind this mesh
    console.log('Mesh was clicked');
  };
  const onMouseMove = (e) => {
    console.log('Mouse is over the mesh');
  };
</script>

<MouseEvents {onClick} {onMouseMove}>
  <Mesh geometry={new BoxGeometry()} />
</MouseEvents>
```

Note that this component is implemented using the below [`<GetChild>`](getchild), so you
should read the note about extra `Object3D`s.

### `<GetChild>`

A component that exposes a svelte binding to its `Object3D` child. The binding
is set when the component mounts, and wil be `undefined` before then.

Note that `svelte-cubed` currently does not expose object references or allow you
to traverse the three.js scene by default. In order to do so, this component creates
and injects an extra `Object3D` into the scene, using it as a starting-off point
to find its siblings. For that reason, should you inspect the three.js scene you
will see extra objects named "\_". Don't be afraid of them, they're harmless :)

If you pass multiple children to `<GetChild>`, the binding will be set to the
first child it finds in the three.js scene. If you want a reference to multiple
children, use [`<GetChildren>`](#getchildren).

Usage example:

```svelte
<script lang="ts">
  import { BoxGeometry } from 'three';
  import { Mesh } from 'svelted-cubed';
  import { GetChild } from 'svelte-trois';

  let mesh;

  onMount(() => {
    // Do something funky with `mesh`
  });
</script>

<GetChild bind:child={mesh}>
  <Mesh geometry={new BoxGeometry()} />
</GetChild>
```

### `<GetChildren>`

A component that exposes a svelte binding to an array of its `Object3D` children.
The binding is set when the component mounts, and wil be `undefined` before then.

The [note above](#getchild) regarding extra `Object3D`s also applies to this component.

Usage example:

```svelte
<script lang="ts">
  import { BoxGeometry } from 'three';
  import { Mesh } from 'svelted-cubed';
  import { GetChild } from 'svelte-trois';

  let meshes;

  onMount(() => {
    mesh.forEach((mesh) => {
      // Do something funky with each `mesh`
    });
  });
</script>

<GetChild bind:child={mesh}>
  <Mesh geometry={new BoxGeometry()} />
  <Mesh geometry={new BoxGeometry()} />
  <Mesh geometry={new BoxGeometry()} />
</GetChild>
```

## What's with the name?

[`react-three-fiber`](https://github.com/pmndrs/react-three-fiber), while a much
more mature and feature-complete project, has [`drei`](https://github.com/pmndrs/drei)
as its official source of higher-level helpers. This library is inspired by that
same purpose, though for now it's level of a "higher-level" thing, and more of a
gap-filler.

Anyway, given that "drei" is German for "three", and "svelte" comes from French,
it seemed natural to name this after the French word for "three" - "trois"! It
is pronounced like "twah". 🥖🇫🇷🐸
