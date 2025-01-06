<script>
	let { normalColor, hoverColor, onclick, children } = $props();

	let hovering = $state(false);
	let backComponent = null;
</script>

<button
	class="relative flex h-fit items-center justify-center overflow-hidden rounded-xl text-white"
	class:hovering
	style:color={hoverColor}
	onmouseenter={() => (hovering = true)}
	onmouseleave={() => (hovering = false)}
	{onclick}
>
	{@render children()}
	<div class="absolute -z-20 h-full w-full rounded-xl p-[1px]">
		<div class="relative h-full w-full rounded-xl" style:background-color={normalColor}></div>
	</div>
	<div
		class="absolute -z-10 w-full rounded-full pb-[100%] transition-transform duration-500 {hovering
			? 'scale-105'
			: 'scale-0'}"
		bind:this={backComponent}
		style:background-color={hoverColor}
	></div>
</button>
