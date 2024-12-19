<script>
	import { DOMAINS } from '$lib/domain.js';
	import { getContext } from 'svelte';
	/** @typedef {import("$lib/domain.js").Domain} Domain */

	/** @type {{current: Domain}} */
	const domainContext = getContext('domain');
	const domain = $derived(domainContext.current || DOMAINS[0]);

	/** @type {Record<Domain, string>} */
	const color = {
		game: '#8B83F5',
		animation: '#DB6CD0'
	};

	const topHeight = $derived(getContext('size').height > 0 ? getContext('size').height / 6 : 147);
	const bottomHeight = $derived(
		getContext('size').height > 0 ? getContext('size').height / 7 : 125
	);

	function textVerticalBP() {
		const height = getContext('size').height;
		if (height > 640) return '16px';
		else return '2vh';
	}

	function lineXVerticalBP() {
		const height = getContext('size').height;
		if (height > 640) return '12px';
		else if (height > 320) return '8px';
		else return '6px';
	}

	function lineWVerticalBP() {
		const height = getContext('size').height;
		if (height > 640) return '3';
		else return '2';
	}
</script>

<div
	class="hidden h-full select-none flex-col justify-between transition-colors duration-1000 sm:flex"
	style:--watermark-color={color[domain]}
>
	<svg
		class="relative"
		style:left={lineXVerticalBP()}
		width="92"
		height={topHeight}
		viewBox="0 0 92 {topHeight}"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M1.5 {topHeight}C1.5 118 1.5 56.7 1.5 43.5C1.5 13.5 18 1.5 43.5 1.5C63.9 1.5 70.8333 1.5 92 1.5"
			stroke-width={lineWVerticalBP()}
		/>
	</svg>

	<div
		style:font-size={textVerticalBP()}
		style:letter-spacing="0.5em"
		style:writing-mode="vertical-lr"
		style:color={color[domain]}
	>
		CHAN CHEUK KIN
	</div>

	<svg
		class="relative"
		style:left={lineXVerticalBP()}
		width={lineWVerticalBP()}
		height={bottomHeight}
		viewBox="0 0 3 {bottomHeight}"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<line x1="1.5" y1="0" x2="1.5" y2={bottomHeight} stroke-width="3" />
	</svg>
</div>

<style>
	line,
	path {
		stroke: var(--watermark-color);
	}
	div {
		color: var(--watermark-color);
	}
</style>
