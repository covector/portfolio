<script>
	import { gotoPage, image } from '$lib/utils';
	import * as m from '$lib/paraglide/messages.js';
	import BackIcon from '../common/svg/BackIcon.svelte';
	import FlyIn from '../common/FlyIn.svelte';
	import ArrowDown from '../common/svg/ArrowDown.svelte';
	import { getContext, onMount } from 'svelte';
	import PlayIcon from '../common/svg/PlayIcon.svelte';
	import CoolButton from '../common/CoolButton.svelte';

	/** @typedef {import("$lib/paraglide/runtime").AvailableLanguageTag} Lang */
	/** @type {Lang} */
	const lang = getContext('lang');

	let scroll = $state(0);
	onMount(() => {
		/** @param {Event} e */
		function onScroll(e) {
			scroll = window.scrollY;
		}
		window.addEventListener('scroll', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	});
</script>

<div class="{lang == 'en' ? 'font-jersey leading-6 text-2xl' : 'font-dotgothic16 leading-9'}">
	<button
		class="fixed left-8 top-32 z-30 min-[400px]:top-10 sm:left-20 sm:top-20 lg:left-28"
		onclick={() => gotoPage('game')}
	>
		<BackIcon color="#DFDDF9" class="size-6 sm:size-10" />
	</button>
	{/* BANNER SECTION */ null}
	<div
		class="banner h-screen w-full"
		style="clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); clip-path: fill-box;"
	>
		{/* BANNER BACKGROUND */ null}
		<img
			class="fixed w-full 2xl:w-11/12 right-0 h-full object-cover pointer-events-none"
			src={image('games/chameleon/env_3.webp')}
			style:z-index="0"
			alt="banner render back layer"

		/>

		<div class="fixed size-full flex" style:z-index="3" style:transform="translateY(-{scroll / 10}px)">
			{/* BANNER TEXT */ null}
			<FlyIn class="absolute size-full" distance="100px">
				<div
					class="banner-text center-x absolute bottom-1/4 flex w-5/6 flex-col items-center gap-7 sm:w-1/2 xl:w-1/3"
				>
					<img class="w-full select-none" src={image('games/chameleon/banner.webp')} alt="logo" />

					<div
						class="w-10/12 text-2xl {lang == 'en'
							? 'font-jersey leading-6'
							: 'font-dotgothic16 leading-9'} lg:text-[1.6rem]"
						style:color="#8781b9"
					>
						{m.quote()}{m.chameleon_description()}{m.quote_end()}
					</div>
					<div class="w-full flex justify-center gap-4">
						<CoolButton
							normalColor="#2D2C3A"
							hoverColor="#000000"
							onclick={() => {
								window.open("https://covector.github.io/Chameleon/", "_blank");
							}}
						>
							<PlayIcon color="white" class="size-8 ml-2" />
							<div class="my-3 ml-1 mr-3 text-white">{m.play_now()}</div>
						</CoolButton>
						<CoolButton
							normalColor="#6953CB"
							hoverColor="#0e0821"
							onclick={() => {
								window.scrollTo(0, window.innerHeight);
							}}
						>
							<ArrowDown stroke="white" class="size-8 ml-2" />
							<div class="my-3 ml-1 mr-3 text-white">{m.read_more()}</div>
						</CoolButton>
					</div>
				</div>
			</FlyIn>
		</div>
		<img
			class="fixed w-full 2xl:w-11/12 right-0 h-full object-cover pointer-events-none"
			src={image('games/chameleon/env_2.webp')}
			style:z-index="2"
			alt="banner render middle layer"
			style:transform="translateY(-{scroll / 6}px)"
		/>
		<div class="placeholder h-full w-full 2xl:w-11/12 right-0" style:background-color="#000000">
			<img
				class="absolute w-full 2xl:w-11/12 right-0 h-full object-cover pointer-events-none"
				src={image('games/chameleon/env_1.webp')}
				style:z-index="3"
				alt="banner render front layer"
			/>
			
		</div>
		<div
			class="fade absolute left-0 top-0 z-10 h-screen w-full pointer-events-none"
			style:background="linear-gradient(0deg, rgb(19 22 39) 0%, rgba(0,0,0,0) 20%)"
		></div>
	</div>


	{/* DEMO SECTION */ null}
	<button
		class="absolute left-8 top-32 z-30 min-[400px]:top-10 sm:left-20 sm:top-20 lg:left-28"
		onclick={() => gotoPage('game')}
	>
		<BackIcon color="#DFDDF9" class="size-6 sm:size-10" />
	</button>
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
					src="https://www.youtube.com/embed/cNu3ARoF3js?vq=hd720p;feature=oembed&amp;hd=1&amp;modestbranding=1&amp;autohide=1&amp;showinfo=0&&amp;autoplay=0"
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
				src={image('games/chameleon/bush_1.webp')}
				alt="bush decoration"
				class="absolute right-0 top-0 z-10 w-3/12 translate-x-1/2"
			/>
			<img
				src={image('games/chameleon/bush_2.webp')}
				alt="bush decoration"
				class="absolute left-0 top-0 z-10 w-3/12"
				style:transform="translate(-50%, -30%)"
			/>
		</div>
	</div>

	{/* FEATURES SECTION */ null}
	<div class="relative h-screen w-full">
		<div class="w-1/2"></div>
	</div>
</div>
