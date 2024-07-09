//import adapter from '@sveltejs/adapter-auto';
import adapterCloudflare from '@sveltejs/adapter-cloudflare';
import adapterVercel from '@sveltejs/adapter-vercel';

//console.log(process.env.npm_lifecycle_event);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		//adapter: adapter()
		adapter: process.env.npm_lifecycle_event === 'build:c' ? adapterCloudflare() : adapterVercel()
	}
};

export default config;
