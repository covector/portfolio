<script>
	const { stroke, strokeWidth, ...p } = $props();
</script>

<svg
	{...p}
	width={strokeWidth}
	viewBox="0 0 2 100"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	preserveAspectRatio="none"
>
	<line x1="1" y2="100" x2="1" {stroke} stroke-width={strokeWidth} />
</svg>
