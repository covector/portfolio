<script>
	const { play, uri, alt = undefined, ...p } = $props();
	/** @type {HTMLVideoElement} */
	let videoComponent;
	$effect(() => {
		if (play) {
			videoComponent?.play();
		} else {
			videoComponent?.pause();
		}
	});
</script>

<video {...p} bind:this={videoComponent}>
	<source src={uri} type="video/mp4" />
	{#if alt}<p>{alt}</p>{/if}
</video>
