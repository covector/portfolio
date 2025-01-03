<script>
	/**@typedef {import('svelte').Snippet} Snippet */

	const { delay = 0, duration = 0.5, distance = '50%', children, ...p } = $props();
</script>

<div
	class="opacity-0"
	style:animation={`flyIn ${duration}s ease-out ${delay}s forwards`}
	style:--distance={distance}
	style:transform="translateY(var(--distance))"
	{...p}
>
	{@render children()}
</div>

<style>
	@keyframes -global-flyIn {
		0% {
			opacity: 0;
			transform: translateY(-var(--distance, 50%));
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
