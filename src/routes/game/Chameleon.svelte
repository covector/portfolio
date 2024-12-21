<script>
	import { gotoPage, image } from '$lib/utils';
	import * as m from '$lib/paraglide/messages.js';
	import BackIcon from '../common/BackIcon.svelte';
</script>

<div>
	<button
		class="absolute left-8 top-10 z-30 sm:left-20 sm:top-20 lg:left-28"
		onclick={() => gotoPage('game')}
	>
		<BackIcon color="#DFDDF9" class="h-10 w-10" />
	</button>
	<img
		src={image('games/chameleon/banner.png')}
		alt="chameleon banner"
		class="absolute left-1/2 top-40 z-10 w-2/6 -translate-x-1/2 md:top-20"
	/>

	<div
		class="relative mt-48 flex flex-col items-center gap-20 md:mt-32 lg:ml-64 lg:mr-12 lg:mt-40 lg:flex-row lg:items-end 2xl:mt-52"
	>
		<div class="relative w-4/6 shrink-0">
			{/* yt demo */ null}
			<div class="relative w-full pt-[56.25%]">
				<iframe
					class="absolute bottom-0 left-0 right-0 top-0 h-full w-full rounded-md sm:rounded-xl xl:rounded-3xl"
					height="1000"
					src="https://www.youtube.com/embed/cNu3ARoF3js?autoplay=1&loop=1"
					allow="autoplay"
				></iframe>
			</div>
			{/* back rect */ null}
			<div
				class="absolute top-0 -z-10 w-full rounded-md pt-[56.25%] sm:rounded-xl xl:rounded-3xl"
				style:background-color="#47418B"
				style:transform="scale(0.95) translate(4%, 3.5%)"
			></div>

			<img
				src={image('games/chameleon/bush_1.png')}
				alt="bush decoration"
				class="absolute right-0 top-0 z-10 w-3/12 translate-x-1/2"
			/>
			<img
				src={image('games/chameleon/bush_2.png')}
				alt="bush decoration"
				class="absolute left-0 top-0 z-10 w-3/12"
				style:transform="translate(-50%, -30%)"
			/>
		</div>

		<div
			class="relative bottom-14 mx-20 mt-10 shrink text-lg font-bold lg:mx-0 lg:mt-0 xl:text-xl"
			style:color="#84719E"
		>
			{@html m.chameleon_longdesc()}
		</div>
	</div>
</div>
