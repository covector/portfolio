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

	/** @type {HTMLDivElement} */
	let gameplayBox;
	//@ts-ignore
	let gameplayScroll = $derived(scroll - gameplayBox?.offsetTop);

	const gameplayTextLength = 100;
	let duplicateCount = $state(0);
	onMount(() => {
		function onResize() {
			duplicateCount = Math.ceil((window?.innerWidth ?? 0) / gameplayTextLength) + 1;
			console.log(window?.innerWidth);
		}
		onResize();
		window.addEventListener('resize', onResize);
		return () => {
			window.removeEventListener('resize', onResize);
		};
	});
</script>

<div class={lang == 'en' ? 'font-jersey text-2xl leading-6' : 'font-dotgothic16 leading-9'}>
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
			class="pointer-events-none fixed right-0 h-full w-full object-cover 2xl:w-11/12"
			src={image('games/chameleon/env_3.webp')}
			style:z-index="0"
			alt="banner render back layer"
		/>

		<div
			class="fixed flex size-full"
			style:z-index="3"
			style:transform="translateY(-{scroll / 10}px)"
		>
			{/* BANNER TEXT */ null}
			<FlyIn class="absolute size-full" duration={1} distance="30%">
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
					<div class="flex w-full justify-center gap-4">
						<CoolButton
							normalColor="#2D2C3A"
							hoverColor="#000000"
							onclick={() => {
								window.open('https://covector.github.io/Chameleon/', '_blank');
							}}
						>
							<PlayIcon color="white" class="ml-2 size-8" />
							<div class="my-3 ml-1 mr-3 text-white">{m.play_now()}</div>
						</CoolButton>
						<CoolButton
							normalColor="#6953CB"
							hoverColor="#0e0821"
							onclick={() => {
								window.scrollTo(0, window.innerHeight);
							}}
						>
							<ArrowDown stroke="white" class="ml-2 size-8" />
							<div class="my-3 ml-1 mr-3 text-white">{m.read_more()}</div>
						</CoolButton>
					</div>
				</div>
			</FlyIn>
		</div>
		<img
			class="pointer-events-none fixed right-0 h-full w-full object-cover 2xl:w-11/12"
			src={image('games/chameleon/env_2.webp')}
			style:z-index="2"
			alt="banner render middle layer"
			style:transform="translateY(-{scroll / 6}px)"
		/>
		<div class="placeholder right-0 h-full w-full 2xl:w-11/12" style:background-color="#000000">
			<img
				class="pointer-events-none absolute right-0 h-full w-full object-cover 2xl:w-11/12"
				src={image('games/chameleon/env_1.webp')}
				style:z-index="3"
				alt="banner render front layer"
			/>
		</div>
		<div
			class="fade pointer-events-none absolute left-0 top-0 z-10 h-screen w-full"
			style:background="linear-gradient(0deg, rgb(19 22 39) 0%, rgba(0,0,0,0) 20%)"
		></div>
	</div>

	{/* GAMEPLAY SECTION */ null}
	<div class="relative h-8 w-full overflow-hidden" style:background-color="#51418B">
		<div
			class="center-y relative text-nowrap font-jersey text-2xl"
			style:--distance="{-gameplayTextLength}px"
			style:animation="textRoll 4s linear infinite"
		>
			{#each Array.from({ length: duplicateCount }, (_, i) => i)}
				<span class="inline-block w-[{gameplayTextLength}px]">GAMEPLAY</span>
			{/each}
		</div>
	</div>
	<div
		class="relative w-full pb-20 pt-12"
		style="clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); clip-path: padding-box;"
		bind:this={gameplayBox}
	>
		{/* GAMEPLAY TITLE */ null}
		<div
			class="title-box center-x absolute z-20 px-24 {lang == 'en'
				? 'py-2 font-jersey text-4xl leading-6 md:text-6xl lg:text-8xl'
				: 'py-4 font-dotgothic16 text-2xl md:text-4xl lg:text-6xl'}"
			style:background-color="#51418B"
			style:transition="clip-path 0.7s"
			style:clip-path={gameplayScroll + (window?.innerHeight ?? 0) > 0
				? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
				: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'}
		>
			{m.gameplay()}
		</div>
		{/* GAMEPLAY VIDEO */ null}
		<div
			class="video-box center-x relative z-10 mt-14 w-3/4 transition-transform duration-700 md:w-2/3 lg:mt-20"
			style:transform="translate(-50%, {gameplayScroll + (window?.innerHeight ?? 0) / 3 > 0
				? 0
				: 100}%)"
		>
			<div class="relative w-full pt-[56.25%]">
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
				></iframe>
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

		<div class="absolute top-0 size-full">
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
					<animate
						attributeName="d"
						dur="21s"
						repeatCount="indefinite"
						calcMode="spline"
						keyTimes="0; 0.5; 1"
						keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
						values="M-28 450C188.5 373 63.5 275 291.5 311C519.5 347 823 737.5 1155 701C1487 664.5 1493 399.5 1652.5 370.5;M-20.5 436.5C182 522.5 174.5 510.5 353.5 485.5C582.106 453.572 792.5 293 1124.5 256.5C1456.5 220 1512.5 330.5 1652.5 370.5;M-28 450C188.5 373 63.5 275 291.5 311C519.5 347 823 737.5 1155 701C1487 664.5 1493 399.5 1652.5 370.5;"
					/>
				</path>
				<path
					d="M-44 328C89.5 360 301.5 668 438 656C667.938 635.786 677.5 235.5 1009.5 199C1341.5 162.5 1494.5 419.5 1636.5 502.5"
					stroke="#3B238A"
					stroke-width="5"
				>
					<animate
						attributeName="d"
						dur="26s"
						repeatCount="indefinite"
						calcMode="spline"
						keyTimes="0; 0.5; 1"
						keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
						values="M-44 328C89.5 360 301.5 668 438 656C667.938 635.786 677.5 235.5 1009.5 199C1341.5 162.5 1494.5 419.5 1636.5 502.5;M-44 342C92 361.5 307 541.5 443.5 529.5C673.438 509.286 795 441.506 1027 416C1313.5 384.502 1499.5 453 1647 333;M-44 328C89.5 360 301.5 668 438 656C667.938 635.786 677.5 235.5 1009.5 199C1341.5 162.5 1494.5 419.5 1636.5 502.5;"
					/>
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
					<animateTransform
						attributeName="transform"
						attributeType="XML"
						type="rotate"
						from="33.8917 72.64 481.5"
						to="393.8917 72.64 481.5"
						dur="20s"
						repeatCount="indefinite"
					/>
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
					<animateTransform
						attributeName="transform"
						attributeType="XML"
						type="rotate"
						from="69.0763 1522.48 213"
						to="-209.0763 1522.48 213"
						dur="16s"
						repeatCount="indefinite"
					/>
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
					<animateTransform
						attributeName="transform"
						attributeType="XML"
						type="rotate"
						from="87.8789 168.069 642.755"
						to="447.8789 168.069 642.755"
						dur="10s"
						repeatCount="indefinite"
					/>
				</rect>
			</svg>
		</div>
	</div>

	{/* FEATURES SECTION */ null}
	<div class="relative h-screen w-full bg-black">
		<div class="w-1/2"></div>
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
</style>
