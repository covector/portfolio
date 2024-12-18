<script>
	import { getContext } from 'svelte';

	/** @typedef {import("$lib/domain.js").Domain} Domain */

	/** @type {Record<Domain, string>}*/
	const bgColor = {
		game: '#000000',
		animation: '#F7F8FB'
	};
</script>

<svg
	class="fixed left-0 top-0 z-[-20] h-screen w-full transition-colors duration-1000"
	style:background-color={bgColor[/** @type {Domain} */ (getContext('domain').current)]}
	viewBox="0 0 1620 800"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<g filter="url(#filter0_f_319_4)">
		<ellipse cx="189" cy="629" rx="357" ry="329" fill="#F9CCEA" fill-opacity="0.07" />
		<ellipse cx="1459.5" cy="463.5" rx="393.5" ry="463.5" fill="#ABB6FF" fill-opacity="0.21" />
		<ellipse cx="495.5" cy="-85.5" rx="533.5" ry="343.5" fill="#E2CCF9" fill-opacity="0.27" />
	</g>
	<defs>
		<filter
			id="filter0_f_319_4"
			x="-468"
			y="-729"
			width="2621"
			height="1987"
			filterUnits="userSpaceOnUse"
			color-interpolation-filters="sRGB"
		>
			<feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_319_4" />
		</filter>
	</defs>
</svg>
