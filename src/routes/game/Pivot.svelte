<script>
	import { gotoPage, image } from '$lib/utils';
	import * as m from '$lib/paraglide/messages.js';
	import HorizontalLine from '../common/svg/HorizontalLine.svelte';
	import { onMount } from 'svelte';
	import ArrowDown from '../common/svg/ArrowDown.svelte';
	import VerticalLine from '../common/svg/VerticalLine.svelte';
	import BackIcon from '../common/svg/BackIcon.svelte';
	import Cross from '../common/svg/Cross.svelte';
	import FlyIn from '../common/FlyIn.svelte';

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

	/** @type {HTMLDivElement} */
	let gameplayBox;
	//@ts-ignore
	let gameplayScroll = $derived(scroll - gameplayBox?.offsetTop);
	/** @type {HTMLDivElement} */
	let conceptArtBox;
	//@ts-ignore
	let conceptArtScroll = $derived(scroll - conceptArtBox?.offsetTop);

	const artImg = [
		'games/pivot/axe_concept.png',
		'games/pivot/cave_concept.png',
		'games/pivot/animation_concept.mp4',
		'games/pivot/monster_concept.png'
	];
	const aspect = [1.02985, 1.9879, 1, 2.14865];
	let largerView = $state(-1);
	/** @type {HTMLDivElement|null} */
	let largerContainer = $state(null);
	let ratio = $state(1);
	function onResize() {
		ratio = (largerContainer?.clientWidth ?? 1) / (largerContainer?.clientHeight ?? 1);
		topCorner = {
			x: useHeight
				? ((largerContainer?.clientWidth ?? 0) -
						(largerContainer?.clientHeight ?? 0) * aspect[largerView]) /
					2
				: 0,
			y: useHeight
				? 0
				: ((largerContainer?.clientHeight ?? 0) -
						(largerContainer?.clientWidth ?? 0) / aspect[largerView]) /
					2
		};
	}
	$effect(() => {
		largerView;
		onResize();
	});
	onMount(() => {
		onResize();
		window.addEventListener('resize', onResize);
		return () => {
			window.removeEventListener('resize', onResize);
		};
	});
	//@ts-ignore
	let useHeight = $derived(ratio > aspect[largerView]);
	let pixelated = $derived(largerView == 3);
	let isVideo = $derived(largerView >= 0 ? artImg[largerView].endsWith('.mp4') : false);
	let topCorner = $state({ x: 0, y: 0 });
</script>

<div class="w-full">
	{/* BANNER SECTION */ null}
	<div
		class="banner h-screen w-full"
		style="clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); clip-path: fill-box;"
	>
		{/* BANNER BACKGROUND */ null}
		<div
			class="banner-art fixed right-0 h-full w-full xl:w-2/3"
			style:transform="translateY(-{scroll / 4}px)"
		>
			<img
				class="center-y absolute h-full object-cover xl:object-contain"
				src={image('games/pivot/banner_art.png')}
				alt="banner art"
			/>
		</div>
		<div class="placeholder size-full" style:background-color="#030708">
			<button
				class="absolute left-8 top-32 z-30 min-[400px]:top-10 sm:left-20 sm:top-20 lg:left-28"
				onclick={() => gotoPage('game')}
			>
				<BackIcon color="#DFDDF9" class="size-6 sm:size-10" />
			</button>
			{/* BANNER TEXT */ null}
			<FlyIn class="absolute z-20 size-full" distance="100px">
				<div
					class="banner-text center-x absolute bottom-1/4 flex w-5/6 flex-col items-center gap-7 sm:w-1/2 xl:bottom-[20%] xl:left-28 xl:w-1/3 xl:translate-x-0"
				>
					<img class="w-full" src={image('games/pivot/pivot_logo.png')} alt="logo" />
					<HorizontalLine stroke="#649B9F" strokeWidth="2" width="90%" class="xl:translate-x-4" />

					<div
						class="w-8/12 font-jersey text-2xl leading-6 lg:text-[1.6rem] xl:translate-x-8"
						style:color="#649B9F"
					>
						“{m.pivot_description()}”
					</div>
					<HorizontalLine stroke="#649B9F" strokeWidth="2" width="90%" class="xl:translate-x-20" />

					<button
						type="button"
						class="xl:translate-x-24"
						onclick={() => {
							window.scrollTo(0, window.innerHeight);
						}}
					>
						<ArrowDown stroke="#A46B6C" class="size-16" />
					</button>
				</div>
			</FlyIn>
		</div>
		<div
			class="fade absolute left-0 top-0 z-10 hidden h-screen w-full xl:block"
			style:background="linear-gradient(0deg, rgba(3,7,8,1) 0%, rgba(3,7,8,0) 25%)"
		></div>
		<div
			class="fade absolute left-0 top-0 z-10 block h-screen w-full xl:hidden"
			style:background="linear-gradient(0deg, rgba(3,7,8,1) 0%, rgba(3,7,8,0) 70%)"
		></div>
	</div>

	{/* GAMEPLAY SECTION */ null}
	<div
		class="relative w-full pb-20 pt-12"
		style="clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); clip-path: padding-box;"
		style:background-color="rgba(41,99,80,0.13)"
		bind:this={gameplayBox}
	>
		{/* GAMEPLAY TITLE */ null}
		<div class="title-box h-20 lg:h-28">
			<div class="flex h-full justify-between pb-12">
				<svg
					viewBox="0 0 100 120"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="none"
					class="h-12 w-20 translate-y-5 md:h-20 md:w-32 xl:h-24 xl:w-64"
					stroke-dashoffset={gameplayScroll + (window?.innerHeight ?? 0) / 2 > 0 ? 0 : 100}
					style:transition="stroke-dashoffset 0.5s"
				>
					<line
						x1="0"
						y1="6"
						x2="100"
						y2="6"
						stroke="#649B9F"
						stroke-width="6"
						stroke-dasharray="100"
					/>
					<line
						x1="0"
						y1="50"
						x2="80"
						y2="50"
						stroke="#649B9F"
						stroke-width="6"
						stroke-dasharray="100"
					/>
					<line
						x1="0"
						y1="94"
						x2="60"
						y2="94"
						stroke="#649B9F"
						stroke-width="6"
						stroke-dasharray="100"
					/>
				</svg>
				<div class="flex h-full items-center gap-4 md:gap-6 xl:gap-8">
					<VerticalLine stroke="#649B9F" strokeWidth="2" height="100%" class="w-1 lg:w-[6px]" />
					<div class="font-jersey text-4xl leading-6 md:text-6xl lg:text-8xl" style:color="#649B9F">
						GAMEPLAY
					</div>
					<VerticalLine stroke="#649B9F" strokeWidth="6" height="100%" class="w-1 lg:w-[6px]" />
				</div>
				<svg
					viewBox="0 0 100 120"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="none"
					class="h-12 w-20 translate-y-5 md:h-20 md:w-32 xl:h-24 xl:w-64"
					stroke-dashoffset={gameplayScroll + (window?.innerHeight ?? 0) / 2 > 0 ? 0 : 100}
					style:transition="stroke-dashoffset 0.5s"
				>
					<line
						x1="100"
						y1="6"
						x2="0"
						y2="6"
						stroke="#649B9F"
						stroke-width="6"
						stroke-dasharray="100"
					/>
					<line
						x1="100"
						y1="50"
						x2="20"
						y2="50"
						stroke="#649B9F"
						stroke-width="6"
						stroke-dasharray="100"
					/>
					<line
						x1="100"
						y1="94"
						x2="40"
						y2="94"
						stroke="#649B9F"
						stroke-width="6"
						stroke-dasharray="100"
					/>
				</svg>
			</div>
		</div>
		{/* GAMEPLAY VIDEO */ null}
		<div
			class="video-box center-x relative w-3/4 transition-transform duration-500 md:w-2/3"
			style:transform="translate(-50%, {gameplayScroll + (window?.innerHeight ?? 0) / 3 > 0
				? 0
				: 100}%)"
		>
			<div class="relative w-full pt-[56.25%]">
				<iframe
					title="pivot gameplay"
					class="absolute bottom-0 left-0 right-0 top-0 size-full rounded-md sm:rounded-xl xl:rounded-3xl"
					height="1080"
					width="1920"
					frameborder="0"
					src="https://www.youtube.com/embed/cNu3ARoF3js?vq=hd720p;feature=oembed&amp;hd=1&amp;modestbranding=1&amp;autohide=1&amp;showinfo=0&&amp;autoplay=0"
					allow="autoplay; encrypted-media"
					allowfullscreen
				></iframe>
			</div>
		</div>

		<div
			class="fade pointer-events-none absolute left-0 top-0 z-10 size-full"
			style:background="linear-gradient(0deg, rgba(72,165,181,0.2) 0%, rgba(72,165,181,0) 25%)"
		></div>
	</div>

	<div class="h-4 w-full bg-white xl:h-8"></div>

	{/* CONCEPT ARTS SECTION */ null}
	<div
		class="bg-attachment-fixed relative flex w-full flex-col gap-28 overflow-x-hidden pb-28 pt-14 sm:block sm:h-[1700px] sm:py-0 xl:h-[1300px]"
		style:background="linear-gradient(0deg, #7CBCBE 0%, #649B9F 100%)"
		style="-webkit-clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); clip-path: padding-box;"
		bind:this={conceptArtBox}
	>
		{/* CONCEPT ARTS TITLE */ null}
		<div
			class="center-xy fixed z-10 select-none"
			style:filter="drop-shadow(0px 4px 0 rgb(74, 74, 74))"
		>
			<div class="relative" style:transform="translateY({-conceptArtScroll / 10}px)">
				<div class="text-center font-jersey text-4xl leading-6 text-white md:text-6xl lg:text-8xl">
					CONCEPT<br />ARTS
				</div>
				<HorizontalLine stroke="#ffffff" strokeWidth="4" width="100%" class="translate-y-4" />
			</div>
		</div>

		{/* POKER DOTS */ null}
		<div class="pointer-events-none absolute right-28 top-14 w-48">
			<img class="w-full" src={image('games/pivot/dots.png')} alt="poker dots" />
		</div>

		{/* WEAPON */ null}
		<div
			class="center-x relative w-10/12 sm:absolute sm:left-28 sm:top-8 sm:w-[400px] sm:translate-x-0 2xl:left-52"
		>
			<img
				class="w-full rounded-xl"
				src={image(artImg[0])}
				alt="weapon"
				role="button"
				onclick={() => (largerView = 0)}
			/>
			<div
				class="absolute -left-64 bottom-16 -z-10 h-[200px] w-[728px] rounded-xl"
				style:background-color="#A2D7D2"
			></div>
			<div class="absolute -bottom-12 left-3 font-jersey text-2xl text-white sm:text-3xl">
				= Player Axe Weapon Design
			</div>
		</div>

		{/* BACKGROUND */ null}
		<div
			class="center-x relative w-10/12 sm:absolute sm:left-auto sm:right-6 sm:top-[500px] sm:w-[640px] sm:translate-x-0 xl:top-[344px] 2xl:right-24"
		>
			<img
				class="w-full rounded-xl"
				src={image(artImg[1])}
				alt="background"
				role="button"
				onclick={() => (largerView = 1)}
			/>
			<div
				class="absolute -right-14 bottom-12 -z-10 h-[100px] w-[800px] rounded-xl"
				style:background-color="#A2D7D2"
			></div>
			<div class="absolute -bottom-12 right-6 font-jersey text-2xl text-white sm:text-3xl">
				= Cave Background Concept
			</div>
		</div>

		{/* MONSTER */ null}
		<div
			class="center-x relative w-10/12 sm:absolute sm:left-auto sm:right-14 sm:top-[1380px] sm:w-[500px] sm:translate-x-0 xl:top-[900px] 2xl:right-48"
		>
			<img
				class="w-full rounded-xl"
				style:image-rendering={pixelated ? 'pixelated' : 'auto'}
				src={image(artImg[3])}
				alt="monster"
				role="button"
				onclick={() => (largerView = 3)}
			/>
			<div
				class="absolute -right-52 bottom-12 -z-10 h-[100px] w-[928px] rounded-xl"
				style:background-color="#A2D7D2"
			></div>
			<div class="absolute -bottom-12 right-6 font-jersey text-2xl text-white sm:text-3xl">
				= Monster Design Concept
			</div>
		</div>

		{/* ANIMATION */ null}
		<div
			class="center-x relative w-10/12 sm:absolute sm:left-48 sm:top-[910px] sm:w-[400px] sm:translate-x-0 sm:xl:top-[650px] 2xl:left-64"
		>
			<video
				class="w-full rounded-xl"
				autoplay
				loop
				muted
				playsinline
				role="button"
				onclick={() => (largerView = 2)}
			>
				<source type="video/mp4" src={image(artImg[2])} />
			</video>
			<div
				class="absolute -left-52 bottom-16 -z-10 h-[200px] w-[640px] rounded-xl"
				style:background-color="#A2D7D2"
			></div>
			<div class="absolute -bottom-12 left-3 font-jersey text-2xl text-white sm:text-3xl">
				= Monster Draft Animation
			</div>
		</div>
	</div>

	{/* LARGER ART */ null}
	<div
		class="fixed left-0 top-0 z-30 h-screen w-full"
		class:pointer-events-none={largerView == -1}
		class:opacity-0={largerView == -1}
		style:background-color="rgba(0,0,0,0.8)"
		onclick={() => (largerView = -1)}
	>
		<div class="center-xy absolute size-5/6" bind:this={largerContainer}>
			{#if largerView != -1}
				{#if isVideo}
					<video
						class="center-xy relative"
						class:w-full={!useHeight}
						class:h-full={useHeight}
						class:hidden={!isVideo}
						autoplay
						loop
						muted
						controls
						onclick={(e) => e.stopPropagation()}
					>
						<source type="video/mp4" src={image(artImg[largerView])} />
					</video>
				{:else}
					<img
						class="center-xy relative"
						class:w-full={!useHeight}
						class:h-full={useHeight}
						class:hidden={isVideo}
						style:image-rendering="pixelated"
						src={image(artImg[largerView])}
						alt="larger art"
						onclick={(e) => e.stopPropagation()}
					/>
				{/if}
			{/if}
			<button
				class="absolute size-8"
				style:top="{topCorner.y}px"
				style:left="{topCorner.x - 48}px"
				onclick={(e) => {
					e.stopPropagation();
					largerView = -1;
				}}
			>
				<Cross class="size-full" stroke="#ffffff" strokeWidth="6" />
			</button>
		</div>
	</div>
</div>
