<script>
	import { DOMAINS } from '$lib/domain';
	import { getContext } from 'svelte';

	let { children } = $props();

	/** @typedef {import("$lib/domain.js").Domain} Domain */

	/** @type {{current: Domain}} */
	const domainContext = getContext('domain');
	const domain = $derived(domainContext.current || DOMAINS[0]);
</script>

<div>
	{#if domain == 'game'}
		<style type="text/css">
			::-webkit-scrollbar-track {
				background: #000000;
			}
			::-webkit-scrollbar-thumb {
				background-color: #000000;
			}
			::-webkit-scrollbar-thumb:hover {
				background-color: #000000;
			}
		</style>
	{:else if domain == 'animation'}
		<style type="text/css">
			::-webkit-scrollbar-track {
				background: #f7f8fb;
			}
			::-webkit-scrollbar-thumb {
				background-color: #c76fdd;
			}
			::-webkit-scrollbar-thumb:hover {
				background-color: #c05ea8;
			}
		</style>
	{/if}
	{@render children()}
</div>

<style>
	:global html {
		overflow-y: scroll;
	}

	:global(::-webkit-scrollbar) {
		width: 10px;
	}

	:global(::-webkit-scrollbar-thumb) {
		border-radius: 5px;
	}
</style>
