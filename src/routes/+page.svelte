<script>
	import { afterNavigate } from '$app/navigation';
	import { getDomainFromUrl } from '$lib/domain';
	import * as runtime from '$lib/paraglide/runtime';
	import DomainSelect from './common/DomainSelect.svelte';
	import { setContext } from 'svelte';
	import { i18n } from '$lib/i18n';
	import { page } from '$app/stores';
	import LanguageSelect from './common/LanguageSelect.svelte';
	import Watermark from './common/Watermark.svelte';
	import AnimationScroll from './animation/AnimationScroll.svelte';
	/** @typedef {import("$lib/domain.js").Domain} Domain */

	let lang = $state(runtime.languageTag());
	let domain = $state({ current: getDomainFromUrl($page.url.pathname) });

	setContext('lang', lang);
	setContext('domain', domain);

	afterNavigate(() => {
		const path = i18n.route($page.url.pathname);
		domain.current = getDomainFromUrl(path);
	});

	/** @type {Record<Domain, string>}*/
	const bgColor = {
		game: '#000000',
		animation: '#F7F8FB'
	};
</script>

<div class="fixed top-0 left-0 w-full h-12 pt-6 px-6 pb-2 grid z-10">
	<div class="justify-self-center row-col-1"><DomainSelect /></div>
	<div class="justify-self-end row-col-1"><LanguageSelect /></div>
</div>
<div class="fixed h-screen top-0 left-0 py-10 pl-6 z-10">
	<Watermark />
</div>

<div
	class="w-full h-screen transition-colors duration-1000"
	style:background-color={bgColor[domain.current]}
>
	<AnimationScroll />
</div>

<style>
	.row-col-1 {
		@apply row-start-1 row-end-1 col-start-1 col-end-1;
	}
</style>
