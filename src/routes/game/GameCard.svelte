<script>
	import { gotoPage } from '$lib/utils';
	import { onMount } from 'svelte';

	/** @typedef {Object} Props
	 * @property {string} title
	 * @property {string} description
	 * @property {string} image
	 * @property {string} previewVideo
	 * @property {string} link
	 */
	/** @type {Props} */
	const { title, description, image, previewVideo, link } = $props();

	let hover = $state(false);
    /** @type {HTMLVideoElement} */
    let videoComponent;
    onMount(() => {
        videoComponent.pause();
    });
</script>

<button
	class="flex h-72 w-64 flex-col transition-transform"
	onclick={() => gotoPage(link)}
	onmouseenter={() => { hover = true; videoComponent.play(); }}
    onmouseleave={() => { hover = false; videoComponent.pause(); }}
>
	<div
		class="size-full rounded-xl border"
		style:border-color="#9675A6"
		style:background="linear-gradient(167deg, rgba(34,25,46,1) 0%, rgba(63,49,65,1) 100%)"
	>
	<div class="relative h-32 w-full rounded-t-xl">
		<img
			src={image}
			alt="thumbnail"
			class="size-full absolute rounded-t-xl object-cover"
		/>
		<video
			class="size-full absolute rounded-t-xl object-cover z-10 transition-opacity"
			style:opacity={hover ? 1 : 0}
			loop muted autoplay
			bind:this={videoComponent}
			>
			<source src={previewVideo} type="video/mp4" />
		</video>
	</div>
		<div class="px-3 pt-3 text-left text-xl font-bold" style:color="#DFDDF9">{title}</div>
		<div class="px-3 pt-1 text-left text-sm" style:color="#84719E">{description}</div>
	</div>
</button>

<style>
	button:hover {
		transform: translate(-5px, -5px);
	}

	button::before {
		content: '';
		display: block;
		background-color: #47428b;
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: -1;
		border-radius: 0.75rem;
		transition: transform 0.5s;
	}

	button:hover::before {
		transform: translate(10px, 10px);
	}
</style>
