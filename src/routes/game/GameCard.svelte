<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { i18n } from '$lib/i18n';

	/** @typedef {Object} Props
	 * @property {string} title
	 * @property {string} description
	 * @property {string} image
	 * @property {string} link
	 */
	/** @type {Props} */
	const { title, description, image, link } = $props();

	/** @param {string} url  */
	function gotoPage(url) {
		const lang = i18n.getLanguageFromUrl($page.url);
		const localisedPath = i18n.resolveRoute(`${url}`, lang);
		goto(localisedPath);
	}
</script>

<button class="flex h-72 w-64 flex-col transition-transform" onclick={() => gotoPage(link)}>
	<div
		class="size-full rounded-xl border"
		style:border-color="#9675A6"
		style:background="linear-gradient(167deg, rgba(34,25,46,1) 0%, rgba(63,49,65,1) 100%)"
	>
		<img src={image} alt={title} class="h-32 w-full rounded-t-xl object-cover" />
		<div class="px-3 pt-3 text-left text-xl font-bold" style:color="#DFDDF9">{title}</div>
		<div class="px-3 pt-1 text-left text-sm" style:color="#84719E">{description}</div>
	</div>
</button>

<style>
	button:hover {
		transform: translate(-5px, -5px);
	}

	button::before {
		content: '';
		display: block;
		background-color: #47428b;
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
