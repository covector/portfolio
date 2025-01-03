<script>
	const { stroke, strokeWidth, ...p } = $props();
</script>

<svg
	{...p}
	height={strokeWidth}
	viewBox="0 0 100 2"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	preserveAspectRatio="none"
>
	<line y1="1" x2="100" y2="1" {stroke} stroke-width={strokeWidth} />
</svg>
