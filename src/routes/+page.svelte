<script>
	import { afterNavigate } from '$app/navigation';
	import { getDomainFromUrl } from '$lib/domain';
	import * as runtime from '$lib/paraglide/runtime';
	import DomainSelect from './common/DomainSelect.svelte';
	import { setContext } from 'svelte';
	import { i18n } from '$lib/i18n';
	import { page } from '$app/stores';
	import LanguageSelect from './common/LanguageSelect.svelte';

	let lang = $state(runtime.languageTag());
	let domain = $state({ current: getDomainFromUrl($page.url.pathname) });

	setContext('lang', lang);
	setContext('domain', domain);

	afterNavigate(() => {
		const path = i18n.route($page.url.pathname);
		domain.current = getDomainFromUrl(path);
	});
</script>

<DomainSelect />
<LanguageSelect />
