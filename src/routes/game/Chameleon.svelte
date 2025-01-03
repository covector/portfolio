<script>
	import { gotoPage, image } from '$lib/utils';
	import * as m from '$lib/paraglide/messages.js';
	import BackIcon from '../common/svg/BackIcon.svelte';
</script>

<div>
	{/* DEMO SECTION */ null}
	<button
		class="absolute left-8 top-32 z-30 min-[400px]:top-10 sm:left-20 sm:top-20 lg:left-28"
		onclick={() => gotoPage('game')}
	>
		<BackIcon color="#DFDDF9" class="size-6 sm:size-10" />
	</button>
	<img
		src={image('games/chameleon/banner.png')}
		alt="chameleon banner"
		class="absolute left-1/2 top-40 z-10 w-2/6 -translate-x-1/2 md:top-20"
	/>
	<div
		class="relative ml-0 mt-48 flex flex-col items-center gap-20 md:mt-32 xl:ml-64 xl:mr-12 xl:mt-40 xl:flex-row xl:items-end 2xl:mt-52"
	>
		<div class="relative w-[80vw] shrink-0 sm:w-[60vw]">
			{/* yt demo */ null}
			<div class="relative w-full pt-[56.25%]">
				<iframe
					class="absolute bottom-0 left-0 right-0 top-0 size-full rounded-md sm:rounded-xl xl:rounded-3xl"
					height="1080"
					width="1920"
					frameborder="0"
					src="https://www.youtube.com/embed/cNu3ARoF3js?vq=hd720p;feature=oembed&amp;hd=1&amp;modestbranding=1&amp;autohide=1&amp;showinfo=0&&amp;autoplay=1"
					allow="autoplay; encrypted-media"
					allowfullscreen
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
			class="relative bottom-14 mx-20 mt-10 shrink text-base font-bold md:text-lg xl:mx-0 xl:mt-0 xl:text-base 2xl:text-xl"
			style:color="#84719E"
		>
			{@html m.chameleon_longdesc()}
		</div>
	</div>

	{/* FEATURES SECTION */ null}
	<div class="relative h-screen w-full">
		<div class="w-1/2"></div>
	</div>
</div>
