<script>
	import { afterNavigate } from '$app/navigation';
	import { getDomainFromUrl, getPath } from '$lib/domain';
	import * as runtime from '$lib/paraglide/runtime';
	import * as m from '$lib/paraglide/messages.js';
	import DomainSelect from './common/DomainSelect.svelte';
	import { setContext } from 'svelte';
	import { i18n } from '$lib/i18n';
	import { page } from '$app/stores';
	import LanguageSelect from './common/LanguageSelect.svelte';
	import Watermark from './common/Watermark.svelte';
	import AnimationScroll from './animation/AnimationScroll.svelte';
	import MeasurementProvider from './MeasurementProvider.svelte';
	import Blob from './common/Blob.svelte';
	import GameGrid from './game/GameGrid.svelte';
	import OverscrollProvider from './OverscrollProvider.svelte';
	import ScrollColor from './common/ScrollColor.svelte';
	import Chameleon from './game/Chameleon.svelte';
	import Pivot from './game/Pivot.svelte';
	import { image } from '$lib/utils';
	/** @typedef {import("$lib/domain.js").Domain} Domain */

	let lang = $state(runtime.languageTag());
	/** @type {{current: Domain}} */
	let domain = $state({ current: getDomainFromUrl(i18n.route($page.url.pathname)) });
	let subdomain = $state({ current: getPath(i18n.route($page.url.pathname)) });

	setContext('lang', lang);
	setContext('domain', domain);

	afterNavigate(() => {
		const path = i18n.route($page.url.pathname);
		domain.current = getDomainFromUrl(path);
		subdomain.current = getPath(path);
	});
</script>

<svelte:head>
	<title>{m.title()}</title>
	<link rel="icon" href={image(`favicon_${domain.current}.png`)} />
</svelte:head>

<OverscrollProvider>
	<ScrollColor>
		<div class="center-x fixed top-[24px] z-50"><DomainSelect /></div>
		<div
			class="center-x fixed top-[80px] z-50 md:left-[unset] md:right-6 md:top-[26px] md:translate-x-0"
		>
			<LanguageSelect />
		</div>
		<div class="pointer-events-none fixed left-0 top-0 z-50 h-screen py-10 pl-6">
			<MeasurementProvider>
				<Watermark />
			</MeasurementProvider>
		</div>

		<div class="min-h-screen w-full transition-colors duration-1000">
			
				<div class:hidden={domain.current !== 'game'}>
					{#if subdomain.current === ''}
						<GameGrid />
					{:else if subdomain.current === 'chameleon'}
						<Chameleon />
					{:else if subdomain.current === 'pivot'}
						<Pivot />
					{:else}
						<GameGrid />
					{/if}
				</div>
				<div class:hidden={domain.current !== 'animation'}>
					<MeasurementProvider>
						<AnimationScroll />
					</MeasurementProvider>
				</div>
		</div>

		<Blob
			blobColor1={subdomain.current === 'chameleon' ? '#8855FF' : undefined}
			blobColor2={subdomain.current === 'chameleon' ? '#8CFDBF' : undefined}
			animated={false}
		/>
	</ScrollColor>
</OverscrollProvider>

<style>
	.row-col-1 {
		@apply col-start-1 col-end-1 row-start-1 row-end-1;
	}
</style>
