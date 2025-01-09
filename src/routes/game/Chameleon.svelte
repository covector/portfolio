<script>
	import { gotoPage, image, iOS, mobileAndTabletCheck } from '$lib/utils';
	import * as m from '$lib/paraglide/messages.js';
	import BackIcon from '../common/svg/BackIcon.svelte';
	import FlyIn from '../common/FlyIn.svelte';
	import ArrowDown from '../common/svg/ArrowDown.svelte';
	import { getContext, onMount } from 'svelte';
	import PlayIcon from '../common/svg/PlayIcon.svelte';
	import CoolButton from '../common/CoolButton.svelte';
	import Grid from '../common/svg/Grid.svelte';

	/** @typedef {import("$lib/paraglide/runtime").AvailableLanguageTag} Lang */
	/** @type {Lang} */
	const lang = getContext('lang');

	let isMobile = $state(mobileAndTabletCheck());
	onMount(() => {
		isMobile = mobileAndTabletCheck();
	});

	let isIOS = $state(navigator ? iOS() : false);
	onMount(() => {
		isIOS = iOS();
	});

	let scroll = $state(0);
	let ticking = false;
	let topScroll = $state(0);
	const hideMargin = 100;
	let hideBanner = $state(false);
	let hideGameplay = $state(false);
	let hideFeatures = $state(false);
	let hideMonster = $state(false);
	function updateScroll() {
		scroll = window.scrollY;
		topScroll = scroll;
		gameplayScroll = scroll - gameplayBox.offsetTop;
		featureBoxScroll = scroll - featureBox.offsetTop;
		let monsterScroll = scroll - monsterSection.offsetTop;

		hideBanner = topScroll > windowSize.height + hideMargin;
		hideGameplay =
			gameplayScroll < -windowSize.height - hideMargin ||
			gameplayScroll > gameplayBox.offsetHeight + hideMargin;
		hideFeatures =
			featureBoxScroll < -windowSize.height - hideMargin ||
			featureBoxScroll > featureBox.offsetHeight + hideMargin;
		hideMonster =
			monsterScroll < -windowSize.height - hideMargin ||
			monsterScroll > monsterSection.offsetHeight + hideMargin;
	}
	onMount(() => {
		updateScroll();
		function onScroll() {
			updateScroll();

			// jumpscare detect
			if (jumpscareVideo && !jumpscareLock && jumpscareVideo.getBoundingClientRect().top < 10) {
				jumpscareLock = true;
				scrollLock = true;
				setTimeout(() => {
					jumpscareVideo.play();
				}, 500);
			}
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

	let windowSize = $state({ width: 0, height: 0 });
	const gameplayTextLength = 100;
	let duplicateCount = $state(0);
	onMount(() => {
		function onResize() {
			duplicateCount = Math.ceil((window?.innerWidth ?? 0) / gameplayTextLength) + 1;
			windowSize = { width: window.innerWidth, height: window.innerHeight };
		}
		onResize();
		window.addEventListener('resize', onResize);
		return () => {
			window.removeEventListener('resize', onResize);
		};
	});

	/** @type {HTMLDivElement} */
	let featureBox;
	//@ts-ignore
	let featureBoxScroll = $state(-10000);

	let mouse = $state({ x: 0, y: 0 });
	onMount(() => {
		/** @param {MouseEvent} e */
		function onMouseMove(e) {
			mouse = { x: e.clientX, y: e.clientY };
			deviceImgIndex = Math.round((mouse.x / windowSize.width) * 10) + 1;
		}
		window.addEventListener('mousemove', onMouseMove);
		return () => {
			window.removeEventListener('mousemove', onMouseMove);
		};
	});
	let deviceImgIndex = $state(6);
	let scrollLock = $state(false);
	onMount(() => {
		/** @param {Event} e */
		function onScrollInput(e) {
			if (scrollLock) {
				e.preventDefault();
				e.stopPropagation();
			}
		}
		window.addEventListener('DOMMouseScroll', onScrollInput, { passive: false });
		window.addEventListener('mousewheel', onScrollInput, { passive: false });
		window.addEventListener('wheel', onScrollInput, { passive: false });
		window.addEventListener('touchmove', onScrollInput, { passive: false });
		window.addEventListener('keydown', onScrollInput, { passive: false });
		return () => {
			window.removeEventListener('DOMMouseScroll', onScrollInput);
			window.removeEventListener('mousewheel', onScrollInput);
			window.removeEventListener('wheel', onScrollInput);
			window.removeEventListener('touchmove', onScrollInput);
			window.removeEventListener('keydown', onScrollInput);
		};
	});

	/** @type {HTMLDivElement} */
	let monsterSection;
	//@ts-ignore
	let monsterSectionScroll = $derived(scroll - monsterSection?.offsetTop);

	/** @type {HTMLVideoElement} */
	let jumpscareVideo;
	let jumpscareLock = $state(false);

	/** @type {HTMLVideoElement} */
	let runVideo;
	let forwardRun = $state(true);
	onMount(() => {
		function playAnimation() {
			const duration = (500 * windowSize.width) / runVideo.clientWidth;
			runVideo
				?.animate(
					forwardRun
						? [
								{ transform: 'translate(-100%, 0%)', left: 0 },
								{ transform: 'translate(0%, 0%)', left: '100%' }
							]
						: [
								{ transform: 'translate(0%, 0%) scaleX(-1)', left: '100%' },
								{ transform: 'translate(-100%, 0%) scaleX(-1)', left: 0 }
							],
					{
						fill: 'forwards',
						duration: duration,
						easing: 'linear',
						iterations: 1
					}
				)
				.play();
			forwardRun = !forwardRun;
		}

		const interval = setInterval(playAnimation, 10000);
		playAnimation();
		return () => clearInterval(interval);
	});
</script>

<div class={lang == 'en' ? 'font-jersey text-2xl leading-6' : 'font-dotgothic16 leading-9'}>
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
		style={isIOS
			? ''
			: 'clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); clip-path: fill-box;'}
	>
		{/* BANNER BACKGROUND */ null}
		<img
			class="pointer-events-none {isIOS
				? 'absolute'
				: 'fixed'} right-0 h-full w-full object-cover 2xl:w-11/12"
			src={image('games/chameleon/env_3.webp')}
			style:z-index="0"
			alt="banner render back layer"
			class:hidden={hideBanner}
		/>

		<div
			class="{isIOS ? 'absolute' : 'fixed'} flex size-full"
			style:z-index="3"
			style:transform="translateY(-{isIOS ? 0 : topScroll / 10}px)"
			class:hidden={hideBanner}
		>
			{/* BANNER TEXT */ null}
			<FlyIn class="absolute size-full" duration={1} distance="30%">
				<div
					class="banner-text center-x absolute bottom-[15%] flex w-5/6 flex-col items-center gap-4 sm:w-1/2 xl:w-1/3 hmd:bottom-1/4 hmd:gap-7"
				>
					<img class="w-full select-none" src={image('games/chameleon/banner.webp')} alt="logo" />

					<div
						class="w-10/12 {lang == 'en'
							? 'font-jersey leading-6'
							: 'font-dotgothic16'} text-lg hmd:text-2xl [@media_((min-height:594px)_and_(min-width:1025px))]:text-[1.6rem]"
						style:color="#8781b9"
					>
						{m.quote()}{m.chameleon_description()}{m.quote_end()}
					</div>
					<div class="flex w-full justify-center gap-4">
						<CoolButton
							normalColor="#2D2C3A"
							hoverColor="#000000"
							onclick={() => {
								window.open('https://covector.github.io/Chameleon/', '_blank');
							}}
						>
							<PlayIcon color="white" class="ml-2 size-6 hmd:size-8" />
							<div
								class="my-2 ml-1 mr-3 text-white hmd:my-3 {lang == 'en'
									? 'text-xl hmd:text-2xl'
									: 'text-lg hmd:text-lg'}"
							>
								{m.play_now()}
							</div>
						</CoolButton>
						<CoolButton
							normalColor="#6953CB"
							hoverColor="#0e0821"
							onclick={() => {
								window.scrollTo(0, windowSize.height);
								updateScroll();
							}}
						>
							<ArrowDown stroke="white" class="ml-2 size-6 hmd:size-8" />
							<div
								class="my-2 ml-1 mr-3 text-white hmd:my-3 {lang == 'en'
									? 'text-xl hmd:text-2xl'
									: 'text-lg hmd:text-lg'}"
							>
								{m.read_more()}
							</div>
						</CoolButton>
					</div>
				</div>
			</FlyIn>
		</div>
		<img
			class="pointer-events-none {isIOS
				? 'absolute'
				: 'fixed'} right-0 h-full w-full object-cover 2xl:w-11/12"
			src={image('games/chameleon/env_2.webp')}
			style:z-index="2"
			alt="banner render middle layer"
			style:transform="translateY(-{isIOS ? 0 : topScroll / 6}px)"
			class:hidden={hideBanner}
		/>
		<div class="placeholder right-0 h-full w-full 2xl:w-11/12" style:background-color="#000000">
			<img
				class="pointer-events-none absolute right-0 h-full w-full object-cover 2xl:w-11/12"
				src={image('games/chameleon/env_1.webp')}
				style:z-index="3"
				alt="banner render front layer"
				class:hidden={hideBanner}
			/>
		</div>
		<div
			class="fade pointer-events-none absolute left-0 top-0 z-10 h-screen w-full"
			style:background="linear-gradient(0deg, rgb(19 22 39) 0%, rgba(0,0,0,0) 20%)"
			class:hidden={hideBanner}
		></div>
	</div>

	{/* GAMEPLAY SECTION */ null}
	<div class="relative h-8 w-full overflow-hidden" style:background-color="#51418B">
		<div
			class="center-y relative text-nowrap font-jersey text-2xl"
			style:--distance="{-gameplayTextLength}px"
			style:animation={isIOS ? '' : 'textRoll 4s linear infinite'}
			class:hidden={hideGameplay}
		>
			{#each Array.from({ length: duplicateCount }, (_, i) => i)}
				<span class="inline-block" style:width="{gameplayTextLength}px">GAMEPLAY</span>
			{/each}
		</div>
	</div>
	<div
		class="relative w-full text-nowrap pb-20 pt-12"
		style={isIOS
			? ''
			: 'clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); clip-path: padding-box;'}
		bind:this={gameplayBox}
	>
		{/* GAMEPLAY TITLE */ null}
		<div
			class="title-box center-x absolute z-20 px-24 {lang == 'en'
				? 'py-2 font-jersey text-4xl leading-6 md:text-6xl lg:text-8xl'
				: 'py-2 font-dotgothic16 text-2xl md:text-4xl lg:py-4 lg:text-6xl'}"
			style:background-color="#51418B"
			style:transition="clip-path 0.7s"
			style:clip-path={isIOS || gameplayScroll + windowSize.height > 0
				? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
				: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'}
			class:hidden={hideGameplay}
		>
			{m.gameplay()}
		</div>
		{/* GAMEPLAY VIDEO */ null}
		<div
			class="video-box center-x relative z-10 mt-14 w-11/12 overflow-hidden transition-transform duration-700 sm:w-3/4 md:w-2/3 lg:mt-20"
			style:transform="translate(-50%, {isIOS
				? 0
				: gameplayScroll + windowSize.height * 0.6 > 0
					? 0
					: 100}%)"
		>
			<div class="relative w-full pt-[100%] sm:pt-[56.25%]">
				<iframe
					title="chameleon gameplay"
					class="absolute bottom-0 left-0 right-0 top-0 size-full select-none rounded-md border-2 sm:rounded-xl xl:rounded-3xl"
					style:border-color="#3E3E46"
					height="1080"
					width="1920"
					frameborder="0"
					src="https://www.youtube.com/embed/vGH1aHI1nok?vq=hd720p;feature=oembed&amp;hd=1&amp;modestbranding=1&amp;autohide=1&amp;showinfo=0&&amp;autoplay=0"
					allow="autoplay; encrypted-media"
					allowfullscreen
					class:hidden={hideGameplay}
				></iframe>
				<img
					src={image('games/chameleon/bush_1.webp')}
					alt="bush decoration"
					class="pointer-events-none absolute right-0 top-0 z-10 w-3/12 translate-x-1/2 select-none"
					class:hidden={hideGameplay}
				/>
				<img
					src={image('games/chameleon/bush_2.webp')}
					alt="bush decoration"
					class="pointer-events-none absolute left-0 top-0 z-10 w-3/12 select-none"
					style:transform="translate(-50%, -30%)"
					class:hidden={hideGameplay}
				/>
			</div>
		</div>

		<div class="absolute top-0 size-full" class:hidden={hideGameplay}>
			<svg
				width="100%"
				height="100%"
				viewBox="0 0 1595 734"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M-28 450C188.5 373 63.5 275 291.5 311C519.5 347 823 737.5 1155 701C1487 664.5 1493 399.5 1652.5 370.5"
					stroke="#366B67"
					stroke-width="5"
				>
					{#if !isIOS}
						<animate
							attributeName="d"
							dur="21s"
							repeatCount="indefinite"
							calcMode="spline"
							keyTimes="0; 0.5; 1"
							keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
							values="M-28 450C188.5 373 63.5 275 291.5 311C519.5 347 823 737.5 1155 701C1487 664.5 1493 399.5 1652.5 370.5;M-20.5 436.5C182 522.5 174.5 510.5 353.5 485.5C582.106 453.572 792.5 293 1124.5 256.5C1456.5 220 1512.5 330.5 1652.5 370.5;M-28 450C188.5 373 63.5 275 291.5 311C519.5 347 823 737.5 1155 701C1487 664.5 1493 399.5 1652.5 370.5;"
						/>
					{/if}
				</path>
				<path
					d="M-44 328C89.5 360 301.5 668 438 656C667.938 635.786 677.5 235.5 1009.5 199C1341.5 162.5 1494.5 419.5 1636.5 502.5"
					stroke="#3B238A"
					stroke-width="5"
				>
					{#if !isIOS}
						<animate
							attributeName="d"
							dur="26s"
							repeatCount="indefinite"
							calcMode="spline"
							keyTimes="0; 0.5; 1"
							keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
							values="M-44 328C89.5 360 301.5 668 438 656C667.938 635.786 677.5 235.5 1009.5 199C1341.5 162.5 1494.5 419.5 1636.5 502.5;M-44 342C92 361.5 307 541.5 443.5 529.5C673.438 509.286 795 441.506 1027 416C1313.5 384.502 1499.5 453 1647 333;M-44 328C89.5 360 301.5 668 438 656C667.938 635.786 677.5 235.5 1009.5 199C1341.5 162.5 1494.5 419.5 1636.5 502.5;"
						/>
					{/if}
				</path>
				<rect
					x="-43.64"
					y="380.5"
					width="200"
					height="200"
					rx="28"
					transform="rotate(33.8917 73.6401 380.5)"
					fill="#3B238A"
				>
					{#if !isIOS}
						<animateTransform
							attributeName="transform"
							attributeType="XML"
							type="rotate"
							from="33.8917 72.64 481.5"
							to="393.8917 72.64 481.5"
							dur="20s"
							repeatCount="indefinite"
						/>
					{/if}
				</rect>
				<rect
					x="1422.48"
					y="113"
					width="200"
					height="200"
					rx="10"
					transform="rotate(69.0763 1572.48 113.003)"
					fill="#3B238A"
				>
					{#if !isIOS}
						<animateTransform
							attributeName="transform"
							attributeType="XML"
							type="rotate"
							from="69.0763 1522.48 213"
							to="-209.0763 1522.48 213"
							dur="16s"
							repeatCount="indefinite"
						/>
					{/if}
				</rect>
				<rect
					x="101.14"
					y="573.976"
					width="133.854"
					height="136.558"
					rx="19"
					transform="rotate(87.8789 301.14 573.976)"
					fill="#366B67"
				>
					{#if !isIOS}
						<animateTransform
							attributeName="transform"
							attributeType="XML"
							type="rotate"
							from="87.8789 168.069 642.755"
							to="447.8789 168.069 642.755"
							dur="10s"
							repeatCount="indefinite"
						/>
					{/if}
				</rect>
			</svg>
		</div>
	</div>

	{/* FEATURES SECTION */ null}
	<div class="h-4 w-full overflow-hidden bg-black"></div>
	<div
		class="relative h-screen min-h-[1150px] w-full overflow-hidden sm:h-[120vh] sm:min-h-[800px] xl:min-h-[900px]"
		style:background="linear-gradient(247deg, rgba(32,50,48,1) 0%, rgba(13,17,34,1) 100%)"
		bind:this={featureBox}
	>
		{/* FEATURES TITLE */ null}
		<div
			class="relative z-10 h-24 w-full md:h-32 lg:h-48"
			style:background="linear-gradient(70deg, rgba(77,141,150,1) 0%, rgba(54,164,115,1) 100%)"
		>
			<div
				class="center-xy absolute {lang == 'en'
					? 'py-2 font-jersey text-4xl leading-6 md:text-6xl lg:text-8xl'
					: 'py-4 font-dotgothic16 text-3xl md:text-5xl lg:text-7xl'}"
				style:color="#A2D2BA"
			>
				{m.features()}
			</div>
			<div
				class="absolute bottom-0 h-2 w-full md:h-4"
				style:background-color="#A2D2BA"
				class:hidden={hideFeatures}
			></div>
		</div>

		{/* FEATURES CONTENT */ null}
		<div
			class="absolute top-40 z-30 flex w-full flex-col items-center justify-center gap-x-12 gap-y-16 overflow-hidden sm:gap-y-24 md:flex-row lg:gap-x-20 xl:gap-x-36"
			class:hidden={hideFeatures}
		>
			<div
				class="relative h-[400px] w-11/12 rounded-xl border transition-transform duration-700 sm:h-[520px] sm:w-[550px] md:w-[400px] lg:w-[450px] xl:h-[760px] xl:w-[550px]"
				style:background-color="#1A2824"
				style:border-color="#2C4D43"
				style:transform="translateX({isIOS || featureBoxScroll + windowSize.height / 2 > 0
					? 0
					: '-200%'})"
			>
				<div class="h-1/2 w-full p-3 sm:p-6 xl:h-3/4">
					<video class="size-full object-cover" autoplay loop playsinline muted>
						<source src={image('games/chameleon/features_2.webm')} type="video/webm" />
					</video>
				</div>
				<div class="flex h-1/2 w-full gap-3 sm:gap-4 xl:h-1/4">
					<div
						class="ml-4 h-4/5 w-1 shrink-0 rounded-3xl sm:ml-8 sm:w-2"
						style:background="linear-gradient(0deg, rgba(53,165,113,1) 0%, rgba(80,138,154,1) 100%)"
					></div>
					<div class="mr-2 flex h-full flex-col gap-2 sm:gap-4">
						<div
							class={lang == 'en'
								? 'text-2xl sm:text-3xl lg:text-4xl'
								: 'text-xl sm:text-2xl lg:text-3xl'}
							style:color="#88DED4"
						>
							{m.procedural_generation()}
						</div>
						<div
							class={lang == 'en'
								? 'text-xl leading-6 sm:text-2xl sm:leading-7 lg:text-2xl'
								: 'text-md leading-6 sm:text-lg sm:leading-7 lg:text-xl'}
							style:color="#809B99"
						>
							{m.procedural_generation_description()}
						</div>
					</div>
				</div>
			</div>
			<div
				class="relative h-[400px] w-11/12 rounded-xl border transition-transform duration-700 sm:h-[520px] sm:w-[550px] md:w-[400px] lg:w-[450px] xl:h-[760px] xl:w-[550px]"
				style:background-color="#241D2F"
				style:border-color="#40305F"
				style:transform="translateX({isIOS ||
				featureBoxScroll + windowSize.height / 2 - (windowSize.width < 768 ? 400 : 0) > 0
					? 0
					: '200%'})"
			>
				<div class="h-1/2 w-full p-3 sm:p-6 xl:h-3/4">
					<video class="size-full object-cover" autoplay loop playsinline muted>
						<source src={image('games/chameleon/features_1.webm')} type="video/webm" />
					</video>
				</div>
				<div class="flex h-1/2 w-full gap-3 sm:gap-4 xl:h-1/4">
					<div
						class="ml-4 h-4/5 w-1 shrink-0 rounded-3xl sm:ml-8 sm:w-2"
						style:background="linear-gradient(0deg, rgba(53,75,165,1) 0%, rgba(107,80,154,1) 100%)"
					></div>
					<div class="mr-2 flex h-full flex-col gap-2 sm:gap-4">
						<div
							class={lang == 'en'
								? 'text-2xl sm:text-3xl lg:text-4xl'
								: 'text-xl sm:text-2xl lg:text-3xl'}
							style:color="#C69EF6"
						>
							{m.model_assets()}
						</div>
						<div
							class={lang == 'en'
								? 'text-xl leading-6 sm:text-2xl sm:leading-7 lg:text-2xl'
								: 'text-md leading-6 sm:text-lg sm:leading-7 lg:text-xl'}
							style:color="#8D809B"
						>
							{m.model_assets_description()}
						</div>
					</div>
				</div>
			</div>
		</div>

		{/* FEATURES BACKGROUND */ null}
		<div
			class="absolute top-0 h-screen w-full"
			style:transform="translateY({isIOS ? 0 : Math.max(0, featureBoxScroll)}px)"
			class:hidden={hideFeatures}
		>
			<Grid />
		</div>

		{/* DEVICE */ null}
		{#if !isIOS && !isMobile}
			<div
				class="pointer-events-none fixed top-0 z-40 hidden h-screen w-full select-none transition-transform duration-700 md:block"
				style:transform="translateY({Math.abs(featureBoxScroll) < windowSize.height / 2 ? 0 : 50}%)"
				class:hidden={hideFeatures}
			>
				<img
					class="center-x absolute bottom-0 h-2/3 w-2/3 object-contain"
					src={image(`games/chameleon/device/${deviceImgIndex}.webp`)}
					alt="device"
					class:hidden={hideFeatures}
				/>
			</div>
		{/if}

		<div
			class="fade absolute bottom-0 z-20 h-[10vh] w-full sm:h-[20vh]"
			style:background="linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)"
		></div>
	</div>
	{/* MONSTER SECTION */ null}
	<div
		class="relative h-[1380px] min-h-screen w-full overflow-hidden bg-black md:h-[1500px]"
		bind:this={monsterSection}
	>
		<img
			class="absolute right-0 top-[100px] h-[300px] select-none object-cover transition-opacity duration-1000 md:h-[400px]"
			src={image('games/chameleon/monster_1.webp')}
			class:opacity-0={monsterSectionScroll + windowSize.height / 2 > 0 ? false : true}
			alt="monster concept art"
			class:hidden={hideMonster}
		/>
		<div
			class="absolute left-12 top-[200px] bg-black transition-opacity duration-1000 sm:left-[100px] sm:w-[500px] lg:bg-transparent xl:left-[unset] xl:right-[600px] 2xl:right-[800px] {lang ==
			'en'
				? 'text-2xl sm:text-3xl lg:text-[2.25rem]'
				: 'text-xl sm:text-2xl lg:text-[1.875rem]'}"
			class:opacity-0={monsterSectionScroll + windowSize.height / 2 + 100 > 0 ? false : true}
			style:transform="translateY({isIOS ? 0 : -monsterSectionScroll / 3}px)"
			style:color="#7C7C7C"
			class:hidden={hideMonster}
		>
			{m.monster_lore_a()}
		</div>
		<img
			class="absolute left-[-10px] top-[450px] h-[400px] select-none object-cover transition-opacity duration-1000 md:h-[500px]"
			class:opacity-0={monsterSectionScroll + windowSize.height / 2 > 450 ? false : true}
			style:transform="translateY({isIOS ? 0 : -(monsterSectionScroll - 400) / 3.6}px)"
			src={image('games/chameleon/monster_2.webp')}
			alt="monster sighting 1"
			class:hidden={hideMonster}
		/>
		<div
			class="absolute right-12 top-[650px] bg-black transition-opacity duration-1000 sm:right-[100px] sm:w-[350px] lg:bg-transparent xl:left-[800px] xl:right-[unset] {lang ==
			'en'
				? 'text-2xl sm:text-[1.8rem] lg:text-[2rem]'
				: 'text-xl sm:text-2xl lg:text-[1.8rem]'}"
			class:opacity-0={monsterSectionScroll + windowSize.height / 2 > 500 ? false : true}
			style:color="#7C7C7C"
			class:hidden={hideMonster}
		>
			{m.monster_lore_b()}
		</div>
		<img
			class="absolute -right-8 top-[900px] h-[230px] select-none object-cover transition-opacity duration-1000 md:left-1/2 md:h-[300px] md:-translate-x-1/4"
			class:opacity-0={monsterSectionScroll + windowSize.height / 2 > 830 ? false : true}
			src={image('games/chameleon/monster_3.webp')}
			alt="monster sighting 2"
			class:hidden={hideMonster}
		/>
		<div
			class="absolute left-12 top-[950px] bg-black transition-opacity duration-1000 md:w-[650px] lg:bg-transparent xl:left-[unset] xl:right-[580px] 2xl:right-[700px] {lang ==
			'en'
				? 'text-2xl sm:text-3xl lg:text-[2.5rem]'
				: 'text-xl sm:text-2xl lg:text-[2rem]'}"
			class:opacity-0={monsterSectionScroll + windowSize.height / 2 > 650 ? false : true}
			style:transform="translateY({isIOS ? 0 : -(monsterSectionScroll - 650) / 2}px)"
			style:color="#7C7C7C"
			class:hidden={hideMonster}
		>
			{m.monster_lore_c()}
		</div>
		<div
			class="center-x absolute top-[1200px] text-nowrap bg-black transition-opacity duration-1000 md:top-[1350px] {lang ==
			'en'
				? 'text-3xl sm:text-4xl lg:text-5xl'
				: 'text-2xl sm:text-3xl lg:text-4xl'}"
			class:opacity-0={monsterSectionScroll + windowSize.height / 2 > 1150 ? false : true}
			style:transform="translate(-50%,{isIOS ? 0 : -(monsterSectionScroll - 900) / 1.6}px)"
			style:color="#7C7C7C"
			class:hidden={hideMonster}
		>
			{m.monster_lore_d()}
		</div>

		{#if !isIOS}
			<div class="pointer-events-none absolute top-0 h-full w-full" class:hidden={hideMonster}>
				<video
					class="absolute left-0 top-1/2 h-1/2 object-contain md:w-1/2"
					bind:this={runVideo}
					autoplay
					loop
					playsinline
					muted
				>
					<source src={image('games/chameleon/run.webm')} type="video/webm" />
				</video>
			</div>
		{/if}
	</div>

	{/* JUMPSCARE SECTION */ null}
	<div class="relative h-screen w-full bg-black">
		<video
			bind:this={jumpscareVideo}
			class="pointer-events-none size-full object-cover"
			muted
			playsinline
			onended={() => {
				window.scrollTo(0, featureBox.offsetTop);
				updateScroll();
				jumpscareVideo.pause();
				jumpscareVideo.currentTime = 0;
				scrollLock = false;
				setTimeout(() => {
					jumpscareLock = false;
				}, 1000);
			}}
		>
			<source src={image('games/chameleon/jumpscare.webm')} type="video/webm" />
		</video>
	</div>
</div>

<style>
	@keyframes -global-textRoll {
		0% {
			transform: translate(0, -50%);
		}
		100% {
			transform: translate(var(--distance), -50%);
		}
	}
	@keyframes -global-leftToRight {
		0% {
			transform: translate(-100%, 0%);
			left: 0;
		}
		20% {
			transform: translate(-100%, 0%);
			left: 0;
		}
		30% {
			transform: translate(0%, 0%);
			left: 100%;
		}
		50% {
			transform: translate(0%, 0%);
			left: 100%;
		}
		70% {
			transform: translate(0%, 0%) scaleX(-1);
			left: 100%;
		}
		80% {
			transform: translate(-100%, 0%) scaleX(-1);
			left: 0;
		}
		100% {
			transform: translate(-100%, 0%) scaleX(-1);
			left: 0;
		}
	}
</style>
