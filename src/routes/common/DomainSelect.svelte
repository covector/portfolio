<script>
	import { getContext } from 'svelte';
	import * as m from '$lib/paraglide/messages.js';
	import GameIcon from './GameIcon.svelte';
	import AnimationIcon from './AnimationIcon.svelte';
	import { goto } from '$app/navigation';
	import { DOMAINS } from '$lib/domain.js';
	import { base } from '$app/paths';
	import { fixBase } from '$lib/utils';

	/** @typedef {import("$lib/domain.js").Domain} Domain */

	/** @type {{current: Domain}} */
	const domainContext = getContext('domain');
	const domain = $derived(domainContext.current || DOMAINS[0]);

	/** @type {Record<Domain, string>} */
	const bgColor = {
		game: '#1A1421',
		animation: '#FFFFFF'
	};

	/** @type {Record<Domain, Record<Domain, string>>} */
	const textColor = {
		game: { game: '#FFFFFF', animation: '#A39FDC' },
		animation: { game: '#404040', animation: '#FFFFFF' }
	};

	/** @type {Record<Domain, string>} */
	// const selectBgColor = {
	// 	game: 'linear-gradient(#303AA1, #5645B8)',
	// 	animation: 'linear-gradient(#BC69D0, #E592BD)'
	// };

	/** @type {Record<Domain, number>} */
	const offset = {
		game: 0,
		animation: 128
	};

	/** @typedef {import('svelte').Component} Component */
	/** @type {Record<Domain, Component>} */
	const iconTag = {
		game: GameIcon,
		animation: AnimationIcon
	};

	const lang = getContext('lang');
	/** @type {(d: Domain) => void} */
	const setDomain = (d) => {
		// const lang = getContext('lang');
		const newPath = lang == 'en' ? `${fixBase(base)}${d}` : `${fixBase(base)}${lang}/${d}`;
		goto(newPath);
	};
</script>

<div
	class="flex w-fit cursor-pointer select-none rounded-full transition-colors duration-1000 {lang ??
		'en'}"
	style:background={bgColor[domain]}
>
	{#each DOMAINS as d (d)}
		{@const Component = iconTag[d]}
		<button
			class="z-10 flex h-10 w-32 items-center px-2 {d}"
			style:color={textColor[domain][d]}
			onclick={() => {
				setDomain(d);
			}}
		>
			<div class="size-7 shrink-0">
				<Component color={textColor[domain][d]} />
			</div>
			<div class="w-2 shrink"></div>
			<div class="text-base">{m[d]()}</div>
		</button>
	{/each}

	<div
		class="selector"
		style:transform={`translateX(${offset[domain]}px)`}
		style={`--selector-border-color: ${bgColor[domain]}; --before-opacity: ${domain == 'animation' ? 1 : 0}`}
	></div>
</div>

<style>
	.en .animation div {
		font-size: 13px;
	}

	.selector {
		--game-selector-bg: linear-gradient(#303aa1, #5645b8);
		--animation-selector-bg: linear-gradient(#bc69d0, #e592bd);
	}

	.selector,
	.selector::before {
		@apply absolute h-10 w-32 rounded-full border-2 transition-all duration-1000;
		background: var(--game-selector-bg);
		border-color: var(--selector-border-color);
	}

	.selector::before {
		top: -2px;
		left: -2px;
		content: '';
		background: var(--animation-selector-bg);
		opacity: var(--before-opacity);
	}
</style>
