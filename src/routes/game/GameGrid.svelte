<script>
	import { base } from '$app/paths';
	import * as m from '$lib/paraglide/messages.js';
	import { fixBase } from '$lib/utils';
	import { getContext, onMount } from 'svelte';
	import GameCard from './GameCard.svelte';

	/** @typedef {Object} ColorProps
		 * @property {string} borderColor
		 * @property {string} background
		 * @property {string} titleColor
		 * @property {string} descColor
		 * @property {string} hoverColor
	 */

	/** @type {{id: string, image: string, previewVideo?: string, colors: ColorProps}[]} */
	const games = [
		{
			id: 'chameleon',
			image: 'games/thumbnails/test.png',
			previewVideo: 'games/thumbnails/test.webm',
			colors: {
				borderColor: '#9675A6',
				background: 'linear-gradient(167deg, rgba(34,25,46,1) 0%, rgba(63,49,65,1) 100%)',
				titleColor: '#DFDDF9',
				descColor: '#84719E',
				hoverColor: '#47428b'
			}
		},
		{
			id: 'pivot',
			image: 'games/thumbnails/pivot_thumbnail.png',
			colors: {
				borderColor: '#75A69A',
				background: 'linear-gradient(167deg, #192E22 0%, #314141 100%)',
				titleColor: '#DDF9F1',
				descColor: '#719E9B',
				hoverColor: '#468976'
			}
		}
	];
</script>

<div
	class="absolute right-0 grid w-full grid-cols-1 justify-items-center gap-y-12 py-40 sm:w-11/12 sm:grid-cols-2 min-[1000px]:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
	style:transform={`translateY(${getContext('overscroll').current}px)`}
>
	{#each games as game, i (i)}
		<div
			class="translate-y-1/2 opacity-0"
			style:animation={`flyIn 0.5s ease-out ${i * 0.1}s forwards`}
		>
			{/* @ts-ignore */ null}
			<GameCard
				title={m[`${game.id}_title`]()}
				description={m[`${game.id}_description`]()}
				image={fixBase(base) + game.image}
				previewVideo={game.previewVideo && fixBase(base) + game.previewVideo}
				link="game/{game.id}"
				colors={game.colors}
			/>
		</div>
	{/each}
</div>

<style>
	@keyframes -global-flyIn {
		0% {
			opacity: 0;
			transform: translateY(50%);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
