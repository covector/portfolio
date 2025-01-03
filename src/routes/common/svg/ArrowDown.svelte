<script>
	const { stroke, ...p } = $props();
</script>

<svg
	{...p}
	width="128"
	height="128"
	viewBox="0 0 128 128"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path d="M32 32.5L64 60.5L95 32.5" {stroke} stroke-width="12" stroke-linecap="square" />
	<path d="M32 69L64 97L95 69" {stroke} stroke-width="12" stroke-linecap="square" />
</svg>
