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
	import MeasurementProvider from './MeasurementProvider.svelte';
	import Blob from './common/Blob.svelte';
	/** @typedef {import("$lib/domain.js").Domain} Domain */

	let lang = $state(runtime.languageTag());
	let domain = $state({ current: getDomainFromUrl($page.url.pathname) });

	setContext('lang', lang);
	setContext('domain', domain);

	afterNavigate(() => {
		const path = i18n.route($page.url.pathname);
		domain.current = getDomainFromUrl(path);
	});
</script>

<div
	class="fixed left-0 top-0 z-10 flex h-12 w-full flex-col items-center gap-4 px-6 pb-2 pt-6 sm:grid"
>
	<div class="row-col-1 justify-self-center"><DomainSelect /></div>
	<div class="row-col-1 justify-self-end"><LanguageSelect /></div>
</div>
<div class="fixed left-0 top-0 z-10 h-screen py-10 pl-6">
	<MeasurementProvider>
		<Watermark />
	</MeasurementProvider>
</div>

<div class="min-h-screen w-full transition-colors duration-1000">
	<MeasurementProvider>
		<div class:hidden={domain.current !== 'animation'}>
			<AnimationScroll />
		</div>
	</MeasurementProvider>
</div>

<Blob />

<style>
	.row-col-1 {
		@apply col-start-1 col-end-1 row-start-1 row-end-1;
	}
</style>
