<script>
	const {
		delay = 0,
		duration = 0.5,
		distance = '50%',
		vertical = true,
		overflowFix = true,
		children,
		...p
	} = $props();
</script>

<div
	style:animation={`flyIn${vertical ? 'Y' : 'X'} ${duration}s ease-out ${delay}s forwards`}
	style:--distance={distance}
	style:transform={vertical ? 'translateY(var(--distance))' : 'translateX(var(--distance))'}
	class:overflow-hidden={overflowFix}
	style:opacity={0}
	{...p}
>
	{@render children()}
</div>

<style>
	@keyframes -global-flyInX {
		0% {
			opacity: 0;
			transform: translateX(var(--distance));
		}
		100% {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes -global-flyInY {
		0% {
			opacity: 0;
			transform: translateY(var(--distance));
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
