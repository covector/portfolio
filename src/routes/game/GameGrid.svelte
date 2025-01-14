<script>
	import { base } from '$app/paths';
	import * as m from '$lib/paraglide/messages.js';
	import { fixBase } from '$lib/utils';
	import { getContext, onMount } from 'svelte';
	import GameCard from './GameCard.svelte';
	import FlyIn from '../common/FlyIn.svelte';

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
			image: 'games/thumbnails/chameleon_thumbnail.webp',
			previewVideo: 'games/thumbnails/chameleon_preview.webm',
			colors: {
				borderColor: '#9675A6',
				background: 'linear-gradient(167deg, rgba(34,25,46,1) 0%, rgba(63,49,65,1) 100%)',
				titleColor: '#DFDDF9',
				descColor: '#AF92EA',
				hoverColor: '#47428b'
			}
		},
		{
			id: 'pivot',
			image: 'games/thumbnails/pivot_thumbnail.webp',
			previewVideo: 'games/thumbnails/pivot_preview.webm',
			colors: {
				borderColor: '#75A69A',
				background: 'linear-gradient(167deg, #192E22 0%, #314141 100%)',
				titleColor: '#DDF9F1',
				descColor: '#8CD2BE',
				hoverColor: '#468976'
			}
		}
	];
</script>

<div
	class="absolute right-0 grid w-full grid-cols-1 justify-items-center gap-y-12 py-40 xl:w-11/12 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
	style:transform={`translateY(${getContext('overscroll').current}px)`}
>
	{#each games as game, i (i)}
		<FlyIn
			delay={i * 0.1}
			class="flex justify-center"
			overflowFix={false}
			style="max-width: -webkit-fill-available"
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
		</FlyIn>
	{/each}
</div>
