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
	<path d="M43 28.5L21.25 41.0574L21.25 15.9426L43 28.5Z" fill={color} />
</svg>
