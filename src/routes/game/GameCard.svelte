<script>
	import { gotoPage } from '$lib/utils';
	import { onMount } from 'svelte';

	/** @typedef {Object} ColorProps
	 * @property {string} borderColor
	 * @property {string} background
	 * @property {string} titleColor
	 * @property {string} descColor
	 * @property {string} hoverColor
	 */

	/** @typedef {Object} Props
	 * @property {string} title
	 * @property {string} description
	 * @property {string} image
	 * @property {string|undefined} previewVideo
	 * @property {string} link
	 * @property {ColorProps} colors
	 */
	/** @type {Props} */
	const { title, description, image, previewVideo, link, colors } = $props();

	let hover = $state(false);
	/** @type {HTMLVideoElement|null} */
	let videoComponent = $state(null);
	onMount(() => {
		if (videoComponent) {
			videoComponent.pause();
		}
	});
</script>

<button
	class="flex h-72 w-64 flex-col transition-transform"
	onclick={() => gotoPage(link)}
	style:--hoverColor={colors.hoverColor}
	onmouseenter={() => {
		if (videoComponent && previewVideo) {
			hover = true;
			videoComponent.play();
		}
	}}
	onmouseleave={() => {
		if (videoComponent && previewVideo) {
			hover = false;
			videoComponent.pause();
		}
	}}
>
	<div class="size-full">
		<div class="relative h-32 w-full rounded-t-xl z-10">
			<img src={image} alt="thumbnail" class="absolute size-full rounded-t-xl object-cover" />
			{#if previewVideo}	
			<video
				class="absolute z-10 size-full rounded-t-xl object-cover transition-opacity"
				style:opacity={hover ? 1 : 0}
				loop
				muted
				autoplay
				bind:this={videoComponent}
			>
				<source src={previewVideo} type="video/mp4" />
			</video>
			{/if}
		</div>
		<div class="px-3 pt-3 text-left text-xl font-bold z-10 relative" style:color={colors.titleColor}>{title}</div>
		<div class="px-3 pt-1 text-left text-base z-10 relative" style:color={colors.descColor}>{description}</div>
		<div
			class="w-full h-5/6 rounded-xl border absolute bottom-0 left-0"
			style:border-color={colors.borderColor}
			style:background={colors.background}
		></div>
	</div>
</button>

<style>
	button:hover {
		transform: translate(-5px, -5px);
	}

	button::before {
		content: '';
		display: block;
		background: var(--hoverColor);
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
