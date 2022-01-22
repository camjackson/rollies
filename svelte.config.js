/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),

    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',

    // Publish src/lib/svelte-trois as a library
    package: {
      files: (path) => {
        // Include these files in the package
        return path === 'index.ts' || path.startsWith('svelte-trois');
      },
      exports: (path) => {
        // But only this file is directly exported
        return path === 'index.ts';
      },
    },
  },
};

export default config;
