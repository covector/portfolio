<script>
	import { getContext, onMount } from 'svelte';
	import { setContext } from 'svelte';

	let { children } = $props();

	/** @typedef {{width: number, height: number}} Size */
	/** @type {Size} */
	let size = $state({ width: 0, height: 0 });
	/** @type {HTMLDivElement} */
	let selfComponent;

	setContext('size', size);

	const handleResize = () => {
		size.width = selfComponent?.clientWidth ?? -1;
		size.height = selfComponent?.clientHeight ?? -1;
	};
	onMount(() => {
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});

	// hack
	$effect(() => {
		getContext('domain').current;
		handleResize();
	});
</script>

<div class="size-full" bind:this={selfComponent}>
	{@render children()}
</div>
