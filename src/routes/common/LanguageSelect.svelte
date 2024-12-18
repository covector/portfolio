<script>
	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';
	import { i18n } from '$lib/i18n';
	import { page } from '$app/stores';
	import { DOMAINS } from '$lib/domain.js';

	/** @typedef {import("$lib/domain.js").Domain} Domain */
	/** @typedef {import("$lib/paraglide/runtime").AvailableLanguageTag} Lang */

	/** @type {{current: Domain}} */
	const domainContext = getContext('domain');
	const domain = $derived(domainContext.current || DOMAINS[0]);

	/** @type {Record<Domain, string>} */
	const borderColor = {
		game: '#A39FDC',
		animation: '#B1B1B1'
	};

	/** @type {Record<Domain, Record<'true'|'false', string>>} */
	const textColor = {
		game: { true: '#E8E8E8', false: '#A39FDC' },
		animation: { true: '#E8E8E8', false: '#B1B1B1' }
	};

	/** @type {Record<Domain, string>} */
	const selectBgColor = {
		game: '#4138B5',
		animation: '#C76FDD'
	};

	/** @type {Record<Lang, number>} */
	const offset = {
		en: 0,
		ja: 64,
		zh: 128
	};

	/** @type {Record<Lang, string>} */
	const text = {
		en: 'ENG',
		ja: '日本語',
		zh: '中文'
	};

	/** @type {Lang[]}*/
	const LANGS = ['en', 'ja', 'zh'];

	/** @type {Lang}} */
	const lang = getContext('lang');
	/**
	 * @param {Lang} newLanguage
	 */
	const setLanguage = (newLanguage) => {
		const canonicalPath = i18n.route($page.url.pathname);
		const localisedPath = i18n.resolveRoute(canonicalPath, newLanguage);
		goto(localisedPath);
	};

	let tempLang = $state(lang);
	/** @type {NodeJS.Timeout | null} */
	let current = null;
	/**
	 * @param {Lang} newLanguage
	 */
	const delaySetLanguage = (newLanguage) => {
		tempLang = newLanguage;
		if (current) {
			clearTimeout(current);
		}
		current = setTimeout(() => {
			setLanguage(newLanguage);
		}, 300);
	};
</script>

<div
	class="flex w-fit cursor-pointer select-none rounded-full border transition-colors duration-300"
	style:border-color={borderColor[domain]}
>
	{#each LANGS as l (l)}
		<button
			class="z-10 h-8 w-16 text-center text-sm {l}"
			style:color={textColor[domain][l === tempLang ? 'true' : 'false']}
			onclick={() => {
				delaySetLanguage(l);
			}}
		>
			{text[l]}
		</button>
	{/each}

	<div
		class="absolute h-8 w-16 rounded-full transition-all duration-300"
		style:transform={`translateX(${offset[tempLang]}px)`}
		style:background-color={selectBgColor[domain]}
	></div>
</div>
