<script>
	import { base } from '$app/paths';
	import * as m from '$lib/paraglide/messages.js';
	import { fixBase } from '$lib/utils';
	import { getContext, onMount } from 'svelte';
	import GameCard from './GameCard.svelte';

	/** @type {{id: string, image: string}[]} */
	const games = [
		{ id: 'chameleon', image: 'games/thumbnails/test.png' },
		{ id: 'chameleon', image: 'games/thumbnails/test.png' }
	];
</script>

<div
	class="absolute right-0 grid w-11/12 grid-cols-1 justify-items-center gap-y-12 py-40 sm:grid-cols-2 min-[1000px]:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
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
				link="game/{game.id}"
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
