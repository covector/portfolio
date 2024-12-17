<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} color The color for the svg
	 */
	/** @type {Props} */
	const { color } = $props();
</script>

<svg viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
	<circle cx="29" cy="29" r="26" stroke={color} stroke-width="6" />
	<path
		d="M14.1539 35.9618C14.052 35.6559 14 35.3356 14 35.0132V33.2934C14 31.7194 15.2163 30.4131 16.7863 30.301L34.0976 29.0645C34.6861 29.0224 35.2739 29.1548 35.7876 29.4451L44.643 34.4504C45.7548 35.0788 46.3469 36.3422 46.1184 37.5987L45.8949 38.8281C45.66 40.12 44.6122 41.109 43.309 41.2691L19.4357 44.2009C18.0187 44.3749 16.6754 43.5263 16.224 42.1719L14.1539 35.9618Z"
		fill={color}
	/>
	<circle cx="28.5" cy="17.5" r="6.5" fill={color} />
	<rect x="25" y="36" width="15" height="7" transform="rotate(-90 25 36)" fill={color} />
</svg>
