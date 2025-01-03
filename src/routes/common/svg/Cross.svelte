<script>
	const { stroke, strokeWidth, ...p } = $props();
</script>

<svg {...p} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M22 22L107 107" {stroke} stroke-width={strokeWidth} />
	<path d="M107 22L22 107" {stroke} stroke-width={strokeWidth} />
</svg>
