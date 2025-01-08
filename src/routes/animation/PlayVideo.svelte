<script>
	import { image } from "$lib/utils";

	const { play, uri, alt = undefined, ...p } = $props();
	/** @type {HTMLVideoElement} */
	let videoComponent;
	$effect(() => {
		if (play) {
			videoComponent?.play();
		} else {
			videoComponent?.pause();
		}
	});
	let loaded = $state(false);
</script>

{#if !loaded}
	<div class="absolute flex h-full w-full items-center justify-center">
		<svg
			class="h-1/3 w-1/3 animate-spin"
			viewBox="0 0 80 80"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M40 63C27.2975 63 17 52.7026 17 40C17 27.2975 27.2975 17 40 17C52.7026 17 63 27.2975 63 40C63 42.5595 62.5819 45.0213 61.8103 47.3209"
				stroke="#C76FDD"
				stroke-width="9"
				stroke-linecap="round"
			/>
		</svg>
	</div>
{/if}
<video
	{...p}
	bind:this={videoComponent}
	onclick={() => videoComponent.play()}
	onloadeddata={() => {
		loaded = true;
	}}
	style:z-index="1"
	style:position="relative"
>
	<source src={image(uri)} type="video/webm" />
	{#if alt}<p>{alt}</p>{/if}
</video>
