<script>
	import { gotoPage } from '$lib/utils';
</script>

<button
	class="relative z-30 text-white"
	onclick={() => {
		console.log('click');
		gotoPage('game');
	}}
>
	Back
</button>
