<script>
	import { onMount, setContext } from 'svelte';

	let { children } = $props();

	let overscroll = $state({ current: 0 });
	setContext('overscroll', overscroll);

	onMount(() => {
		/**@param {WheelEvent} e */
		function onWheel(e) {
			overscroll.current -= e.deltaY / 5;
		}
		let rid = requestAnimationFrame(function update() {
			const step = 1.2;
			if (overscroll.current > 0) {
				overscroll.current /= step;
			} else if (overscroll.current < 0) {
				overscroll.current /= step;
			}
			if (Math.abs(overscroll.current) < 1) {
				overscroll.current = 0;
			}
			rid = requestAnimationFrame(update);
		});
		window.addEventListener('wheel', onWheel);
		return () => {
			window.removeEventListener('wheel', onWheel);
			cancelAnimationFrame(rid);
		};
	});
</script>

{@render children()}
