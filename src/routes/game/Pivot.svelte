<script>
	import { gotoPage, image, iOS } from '$lib/utils';
	import * as m from '$lib/paraglide/messages.js';
	import HorizontalLine from '../common/svg/HorizontalLine.svelte';
	import { getContext, onMount } from 'svelte';
	import ArrowDown from '../common/svg/ArrowDown.svelte';
	import VerticalLine from '../common/svg/VerticalLine.svelte';
	import BackIcon from '../common/svg/BackIcon.svelte';
	import Cross from '../common/svg/Cross.svelte';
	import FlyIn from '../common/FlyIn.svelte';

	/** @typedef {import("$lib/paraglide/runtime").AvailableLanguageTag} Lang */

	/** @type {Lang} */
	const lang = getContext('lang');

	let isIOS = $state(navigator ? iOS() : false);
	onMount(() => {
		isIOS = iOS();
	});

	let scroll = $state(0);
	let ticking = false;
	const hideMargin = 100;
	let hideBanner = $state(false);
	let hideGameplay = $state(false);
	let hideConceptArt = $state(false);
	function updateScroll() {
		scroll = window.scrollY;
		gameplayScroll = scroll - gameplayBox?.offsetTop;
		conceptArtScroll = scroll - conceptArtBox?.offsetTop;

		hideBanner = scroll > windowSize.height + hideMargin;
		hideGameplay =
			gameplayScroll < -windowSize.height - hideMargin ||
			gameplayScroll > gameplayBox.offsetHeight + hideMargin;
		hideConceptArt =
			conceptArtScroll < -windowSize.height - hideMargin ||
			conceptArtScroll > conceptArtBox.offsetHeight + hideMargin;
	}
	onMount(() => {
		updateScroll();
		function onScroll() {
			updateScroll();
		}

		function onScrollThrottle() {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					onScroll();
					ticking = false;
				});
				ticking = true;
			}
		}
		window.addEventListener('scroll', onScrollThrottle);
		return () => {
			window.removeEventListener('scroll', onScrollThrottle);
		};
	});

	/** @type {HTMLDivElement} */
	let gameplayBox;
	//@ts-ignore
	let gameplayScroll = $state(-10000);
	/** @type {HTMLDivElement} */
	let conceptArtBox;
	//@ts-ignore
	let conceptArtScroll = $state(-10000);

	const artImg = [
		'games/pivot/axe_concept.webp',
		'games/pivot/cave_concept.webp',
		'games/pivot/animation_concept.webm',
		'games/pivot/monster_idea.webp'
	];
	const aspect = [1.02985, 1.9879, 1, 1.106];
	let largerView = $state(-1);
	/** @type {HTMLDivElement|null} */
	let largerContainer = $state(null);
	let ratio = $state(1);
	let windowSize = $state({ width: 0, height: 0 });
	function onResize() {
		windowSize = { width: window.innerWidth, height: window.innerHeight };
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
	let isVideo = $derived(largerView >= 0 ? artImg[largerView].endsWith('.webm') : false);
	let topCorner = $state({ x: 0, y: 0 });
	const conceptArtScrollPoint = [150, 650, 900, 1100];
	let conceptArtsShow = $derived(
		conceptArtScrollPoint.map((p) => conceptArtScroll + windowSize.height > p)
	);
</script>

<div class="w-full">
	<button
		class="min-[400px]:top-10 fixed left-8 top-32 z-30 sm:left-20 sm:top-20 lg:left-28"
		onclick={() => gotoPage('game')}
		aria-label="Back to games"
	>
		<BackIcon color="#DFDDF9" class="size-6 sm:size-10" />
	</button>
	{/* BANNER SECTION */ null}
	<div
		class="banner h-screen w-full"
		style="clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); clip-path: fill-box;"
	>
		{/* BANNER BACKGROUND */ null}
		<div
			class="banner-art {isIOS ? 'absolute' : 'fixed'} right-0 h-full w-full xl:w-2/3"
			style:transform="translateY({isIOS ? 0 : -scroll / 4}px)"
			class:hidden={hideBanner}
		>
			<img
				class="center-y pointer-events-none absolute h-full select-none object-cover xl:object-contain"
				src={image('games/pivot/banner_art.webp')}
				alt="banner art"
			/>
		</div>
		<div class="placeholder size-full" style:background-color="#030708" class:hidden={hideBanner}>
			{/* BANNER TEXT */ null}
			<FlyIn class="absolute z-20 size-full" distance="100px">
				<div
					class="banner-text center-x absolute bottom-[5%] flex w-5/6 flex-col items-center gap-4 sm:w-1/2 xl:left-28 xl:w-1/3 xl:translate-x-0 hmd:bottom-[10%] hmd:gap-7 [@media_(min-height:700px)]:bottom-[20%]"
				>
					<img class="w-full select-none" src={image('games/pivot/pivot_logo.webp')} alt="logo" />
					<HorizontalLine
						stroke="#649B9F"
						strokeWidth="2"
						width="90%"
						style="transform: translateX({isIOS ? 0 : scroll / 10}px)"
					/>

					<div
						class="w-8/12 text-2xl {lang == 'en'
							? 'font-jersey leading-6'
							: 'font-dotgothic16'} text-xl xl:translate-x-8 hmd:text-2xl [@media_((min-height:594px)_and_(min-width:1025px))]:text-[1.6rem]"
						style:color="#649B9F"
					>
						{m.double_quote()}{m.pivot_description()}{m.double_quote_end()}
					</div>
					<div class="flex w-full justify-center xl:translate-x-20">
						<HorizontalLine
							stroke="#649B9F"
							strokeWidth="2"
							width="90%"
							style="transform: translateX({isIOS ? 0 : -scroll / 10}px)"
						/>
					</div>

					<button
						type="button"
						class="xl:translate-x-24"
						onclick={() => {
							window.scrollTo(0, windowSize.height);
							updateScroll();
						}}
					>
						<ArrowDown stroke="#A46B6C" class="size-12 animate-bounce hmd:size-16" />
					</button>
				</div>
			</FlyIn>
		</div>
		<div
			class="fade absolute left-0 top-0 z-10 hidden h-screen w-full xl:block"
			style:background="linear-gradient(0deg, rgba(3,7,8,1) 0%, rgba(3,7,8,0) 25%)"
			class:hidden={hideBanner}
		></div>
		<div
			class="fade absolute left-0 top-0 z-10 block h-screen w-full xl:hidden"
			style:background="linear-gradient(0deg, rgba(3,7,8,1) 0%, rgba(3,7,8,0) 70%)"
			class:hidden={hideBanner}
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
			<div class="flex h-full justify-between pb-12" class:hidden={hideGameplay}>
				<svg
					viewBox="0 0 100 120"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="none"
					class="h-12 w-20 translate-y-5 md:h-20 md:w-32 xl:h-24 xl:w-64"
					stroke-dashoffset={isIOS || gameplayScroll + windowSize.height > 0 ? 0 : 100}
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
					<div
						class="overflow-hidden text-nowrap {lang == 'en'
							? 'font-jersey text-4xl leading-6 md:text-6xl lg:text-8xl'
							: 'font-dotgothic16 text-2xl md:text-4xl lg:text-6xl'}"
						style:color="#649B9F"
						style:transition="width 0.7s"
						style:width={isIOS || gameplayScroll + windowSize.height > 0 ? '100%' : '0'}
					>
						{m.gameplay()}
					</div>
					<VerticalLine stroke="#649B9F" strokeWidth="6" height="100%" class="w-1 lg:w-[6px]" />
				</div>
				<svg
					viewBox="0 0 100 120"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="none"
					class="h-12 w-20 translate-y-5 md:h-20 md:w-32 xl:h-24 xl:w-64"
					stroke-dashoffset={isIOS || gameplayScroll + windowSize.height > 0 ? 0 : 100}
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
			class="video-box center-x relative w-11/12 overflow-hidden transition-transform duration-700 sm:w-3/4 md:w-2/3"
			style:transform="translate(-50%, {isIOS
				? 0
				: gameplayScroll + windowSize.height * 0.6 > 0
					? 0
					: 100}%)"
		>
			<div class="relative w-full pt-[100%] sm:pt-[56.25%]">
				<iframe
					title="pivot gameplay"
					class="absolute bottom-0 left-0 right-0 top-0 size-full select-none rounded-md sm:rounded-xl xl:rounded-3xl"
					height="1080"
					width="1920"
					frameborder="0"
					src="https://www.youtube.com/embed/_vjhPJdsp3E?vq=hd720p;feature=oembed&amp;hd=1&amp;modestbranding=1&amp;autohide=1&amp;showinfo=0&&amp;autoplay=0"
					allow="autoplay; encrypted-media"
					allowfullscreen
					class:hidden={hideGameplay}
				></iframe>
			</div>
		</div>

		<div
			class="fade pointer-events-none absolute left-0 top-0 z-10 size-full"
			style:background="linear-gradient(0deg, rgba(72,165,181,0.2) 0%, rgba(72,165,181,0) 25%)"
			class:hidden={hideGameplay}
		></div>
	</div>

	<div class="h-4 w-full bg-white xl:h-8"></div>

	{/* CONCEPT ARTS SECTION */ null}
	<div
		class="bg-attachment-fixed relative flex w-full flex-col gap-28 overflow-hidden pb-28 pt-14 sm:block sm:h-[1900px] sm:py-0 xl:h-[1500px]"
		style:background="linear-gradient(0deg, #7CBCBE 0%, #649B9F 100%)"
		style="-webkit-clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); clip-path: padding-box;"
		bind:this={conceptArtBox}
	>
		{/* CONCEPT ARTS TITLE */ null}
		<div
			class="{isIOS ? 'left-1/2 top-0' : 'center-xy'} pointer-events-none {isIOS
				? 'absolute'
				: 'fixed'} z-10 select-none transition-transform duration-500"
			style:filter="drop-shadow(0px 4px 0 rgb(74, 74, 74))"
			style:transform="translate(-50%, {isIOS
				? 0
				: conceptArtScroll + windowSize.height / 3 > 0
					? -50
					: -200}%)"
			class:hidden={hideConceptArt}
		>
			<div class="relative" style:transform="translateY({isIOS ? 0 : conceptArtScroll / 8}px)">
				<div
					class="text-center {lang == 'en'
						? 'font-jersey text-4xl leading-6 sm:text-6xl lg:text-8xl'
						: 'font-dotgothic16 text-3xl sm:text-5xl lg:text-7xl'} text-white"
				>
					{@html m.concept_arts()}
				</div>
				<HorizontalLine stroke="#ffffff" strokeWidth="4" width="100%" class="translate-y-4" />
			</div>
		</div>

		{/* POKER DOTS */ null}
		<div
			class="pointer-events-none absolute right-28 top-14 hidden w-48 sm:block"
			style:transform="translateY({isIOS ? 0 : -conceptArtScroll / 10}px)"
		>
			<img
				class="w-full select-none"
				src={image('games/pivot/dots.webp')}
				alt="poker dots"
				class:hidden={hideConceptArt}
			/>
		</div>

		{/* WEAPON */ null}
		<div
			class="center-x relative w-10/12 sm:absolute sm:left-28 sm:top-8 sm:w-[400px] sm:translate-x-0 2xl:left-52"
			class:hidden={hideConceptArt}
		>
			<button class="clickable" onclick={() => (largerView = 0)}>
				<img
					class="relative w-full select-none rounded-xl transition-all duration-700"
					src={image(artImg[0])}
					alt="weapon"
					style:transform="translateX({isIOS || conceptArtsShow[0] ? 0 : -400}px)"
					class:opacity-0={!isIOS && !conceptArtsShow[0]}
				/>
			</button>
			<div
				class="absolute -left-64 bottom-16 -z-10 h-[200px] w-[728px] rounded-xl"
				style:background-color="#A2D7D2"
				style:transform="translateY({isIOS
					? 0
					: -(conceptArtScroll - conceptArtScrollPoint[0]) / 10}px)"
			></div>
			<div
				class="absolute -bottom-12 left-3 {lang == 'en'
					? 'font-jersey text-2xl sm:text-3xl'
					: 'font-dotgothic16 text-xl sm:text-2xl'} text-white"
			>
				= {m.weapon_art_desc()}
			</div>
		</div>

		{/* BACKGROUND */ null}
		<div
			class="center-x relative w-10/12 sm:absolute sm:left-auto sm:right-6 sm:top-[500px] sm:w-[640px] sm:translate-x-0 xl:top-[344px] 2xl:right-24"
			class:hidden={hideConceptArt}
		>
			<button class="clickable" onclick={() => (largerView = 1)}>
				<img
					class="relative w-full select-none rounded-xl transition-all duration-700"
					src={image(artImg[1])}
					alt="background"
					style:transform="translateX({isIOS || conceptArtsShow[1] ? 0 : 400}px)"
					class:opacity-0={!isIOS && !conceptArtsShow[1]}
				/>
			</button>
			<div
				class="absolute -right-14 bottom-12 -z-10 h-[100px] w-[800px] rounded-xl"
				style:background-color="#A2D7D2"
				style:transform="translateY({isIOS
					? 0
					: -Math.min(conceptArtScroll - conceptArtScrollPoint[1]) / 8}px)"
			></div>
			<div
				class="absolute -bottom-12 right-6 {lang == 'en'
					? 'font-jersey text-2xl sm:text-3xl'
					: 'font-dotgothic16 text-xl sm:text-2xl'} text-white"
			>
				= {m.cave_art_desc()}
			</div>
		</div>

		{/* ANIMATION */ null}
		<div
			class="center-x relative w-10/12 sm:absolute sm:left-48 sm:top-[910px] sm:w-[400px] sm:translate-x-0 sm:xl:top-[650px] 2xl:left-64"
			class:hidden={hideConceptArt}
			style:z-index={1}
		>
			<button class="clickable" aria-label="click to enlarge" onclick={() => (largerView = 2)}>
				<video
					class="relative w-full select-none rounded-xl transition-all duration-700"
					autoplay
					loop
					muted
					playsinline
					style:transform="translateX({isIOS || conceptArtsShow[2] ? 0 : -400}px)"
					class:opacity-0={!isIOS && !conceptArtsShow[2]}
				>
					<source type="video/webm" src={image(artImg[2])} />
				</video>
			</button>
			<div
				class="absolute -left-52 bottom-16 -z-10 h-[200px] w-[640px] rounded-xl"
				style:background-color="#A2D7D2"
				style:transform="translateY({isIOS
					? 0
					: -Math.min(conceptArtScroll - conceptArtScrollPoint[2]) / 11}px)"
			></div>
			<div
				class="absolute -bottom-12 left-3 {lang == 'en'
					? 'font-jersey text-2xl sm:text-3xl'
					: 'font-dotgothic16 text-xl sm:text-2xl'} text-white"
			>
				= {m.monster_anim_desc()}
			</div>
		</div>

		{/* MONSTER */ null}
		<div
			class="center-x relative w-10/12 sm:absolute sm:left-auto sm:right-14 sm:top-[1380px] sm:w-[500px] sm:translate-x-0 xl:top-[900px] 2xl:right-48"
			class:hidden={hideConceptArt}
		>
			<button class="clickable" onclick={() => (largerView = 3)}>
				<img
					class="relative w-full select-none rounded-xl transition-all duration-700"
					src={image(artImg[3])}
					alt="monster"
					style:transform="translateX({isIOS || conceptArtsShow[3] ? 0 : 400}px)"
					class:opacity-0={!isIOS && !conceptArtsShow[3]}
				/>
			</button>
			<div
				class="absolute -right-52 bottom-12 -z-10 h-[100px] w-[928px] rounded-xl"
				style:background-color="#A2D7D2"
				style:transform="translateY({isIOS
					? 0
					: -Math.min(0, conceptArtScroll - conceptArtScrollPoint[3]) / 7}px)"
			></div>
			<div
				class="absolute -bottom-12 right-6 {lang == 'en'
					? 'font-jersey text-2xl sm:text-3xl'
					: 'font-dotgothic16 text-xl sm:text-2xl'} text-white"
			>
				= {m.monster_art_desc()}
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
		role="none"
		onkeydown={(e) => e.key == 'Escape' && (largerView = -1)}
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
						<source type="video/webm" src={image(artImg[largerView])} />
					</video>
				{:else}
					<!-- svelte-ignore a11y_click_events_have_key_events --><!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
					<img
						class="center-xy relative"
						class:w-full={!useHeight}
						class:h-full={useHeight}
						class:hidden={isVideo}
						src={image(artImg[largerView])}
						alt="larger art"
						onclick={(e) => e.stopPropagation()}
					/>
				{/if}
			{/if}
			<button
				class="absolute size-8 -translate-y-12 sm:-translate-x-12 sm:translate-y-0"
				style:top="{topCorner.y}px"
				style:left="{topCorner.x}px"
				onclick={(e) => {
					e.stopPropagation();
					largerView = -1;
				}}
			>
				<Cross class="size-full" stroke="#ffffff" strokeWidth="12" />
			</button>
		</div>
	</div>
</div>

<style>
	.clickable {
		@apply transition-transform duration-700;
	}

	.clickable:hover {
		transform: scale(1.05);
	}
</style>
