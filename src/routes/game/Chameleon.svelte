<script>
	import { gotoPage, image } from '$lib/utils';
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

	let scroll = $state(0);
	onMount(() => {
		/** @param {Event} e */
		function onScroll(e) {
			scroll = window.scrollY;

			// jumpscare detect
			if (jumpscareVideo && !jumpscareLock && jumpscareVideo.getBoundingClientRect().top < 10) {
				jumpscareLock = true;
				setTimeout(() => {
					if (jumpscareVideo.getBoundingClientRect().top < 10) {
						jumpscareVideo.play();
					}
					else {
						jumpscareLock = false;
					}
				}, 1000);
			}
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
	let widthFactor = $state(1);
	onMount(() => {
		function onResize() {
			duplicateCount = Math.ceil((window?.innerWidth ?? 0) / gameplayTextLength) + 1;
			widthFactor = (window?.innerWidth ?? 0) / 1920;
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
	let featureBoxScroll = $derived(scroll - featureBox?.offsetTop);

	let mouse = $state({ x: 0, y: 0 });
	onMount(() => {
		/** @param {MouseEvent} e */
		function onMouseMove(e) {
			mouse = { x: e.clientX, y: e.clientY };
			deviceImgIndex = Math.round(mouse.x / window.innerWidth * 10)+1;
		}
		window.addEventListener('mousemove', onMouseMove);
		return () => {
			window.removeEventListener('mousemove', onMouseMove);
		};
	});
	let deviceImgIndex = $state(6);

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
			runVideo?.animate(forwardRun ? [
				{ transform: "translate(-100%, 0%)", left: 0 },
				{ transform: "translate(0%, 0%)", left: "100%" }] :
				[
					{ transform: "translate(0%, 0%) scaleX(-1)", left: "100%" },
					{ transform: "translate(-100%, 0%) scaleX(-1)", left: 0 }
				]
				, {
				fill: "forwards",
				duration: 1000 * widthFactor,
				easing: 'linear',
				iterations: 1
			}).play();
			forwardRun = !forwardRun;
		}
    
		const interval = setInterval(playAnimation, 10000);
		playAnimation();
		return () => clearInterval(interval);
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
				<span class="inline-block" style:width="{gameplayTextLength}px">GAMEPLAY</span>
			{/each}
		</div>
	</div>
	<div
		class="text-nowrap relative w-full pb-20 pt-12"
		style="clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); clip-path: padding-box;"
		bind:this={gameplayBox}
	>
		{/* GAMEPLAY TITLE */ null}
		<div
			class="title-box center-x absolute z-20 px-24 {lang == 'en'
				? 'py-2 font-jersey text-4xl leading-6 md:text-6xl lg:text-8xl'
				: 'py-2 lg:py-4 font-dotgothic16 text-2xl md:text-4xl lg:text-6xl'}"
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
	<div class="bg-black h-4 w-full overflow-hidden" bind:this={featureBox}></div>
	<div
		class="relative h-screen sm:h-[120vh] w-full min-h-[1500px] sm:min-h-[1800px] xl:min-h-[900px] overflow-hidden"
		style:background="linear-gradient(247deg, rgba(32,50,48,1) 0%, rgba(13,17,34,1) 100%)"
	>
		{/* FEATURES TITLE */ null}
		<div class="relative w-full h-24 md:h-32 lg:h-48 z-10" style:background="linear-gradient(70deg, rgba(77,141,150,1) 0%, rgba(54,164,115,1) 100%)">
			<div class="absolute center-xy {lang == 'en'
				? 'py-2 font-jersey text-4xl leading-6 md:text-6xl lg:text-8xl'
				: 'py-4 font-dotgothic16 text-3xl md:text-5xl lg:text-7xl'}"
				style:color="#A2D2BA"
			>
				{m.features()}
			</div>
			<div class="absolute bottom-0 w-full h-2 md:h-4" style:background-color="#A2D2BA"></div>
		</div>

		{/* FEATURES CONTENT */ null}
		<div class="absolute w-full flex-col xl:flex-row flex justify-center items-center top-40 gap-y-16 sm:gap-y-24 gap-x-36 z-30 overflow-hidden">
			<div
				class="relative rounded-xl border w-5/6 sm:w-[550px] h-[550px] sm:h-[660px] transition-transform duration-700"
				style:background-color="#241D2F"
				style:border-color="#40305F"
				style:transform="translateX({featureBoxScroll + (window?.innerHeight ?? 0) / 2 > 0 ? 0 : "-200%"})"
			>
				<div class="w-full h-3/4 p-3 sm:p-6">
					<video
						class="size-full object-cover"
						autoplay
						loop
						playsinline
						muted
					>
						<source src={image('games/chameleon/features_1.webm')} type="video/webm" />
					</video>
				</div>
				<div class="relative w-full h-1/4 flex items-center gap-3 sm:gap-4">
					<div class="w-4 h-5/6 ml-4 sm:ml-8 rounded-3xl -translate-y-2 sm:-translate-y-3" style:background="linear-gradient(0deg, rgba(53,75,165,1) 0%, rgba(107,80,154,1) 100%)"></div>
					<div class="h-full flex flex-col gap-2 sm:gap-4 mr-2">
						<div class="{lang == 'en'
						? 'text-2xl sm:text-3xl lg:text-4xl'
						: 'text-xl sm:text-2xl lg:text-3xl'}" style:color="#C69EF6">{m.model_assets()}</div>
						<div class="{lang == 'en'
						? 'text-xl sm:text-2xl lg:text-2xl leading-6 sm:leading-7'
						: 'text-md sm:text-lg lg:text-xl leading-6 sm:leading-7'}" style:color="#8D809B">{m.model_assets_description()}</div>
					</div>
				</div>
			</div>
			<div
				class="relative rounded-xl border w-5/6 sm:w-[550px] h-[550px] sm:h-[660px] transition-transform duration-700"
				style:background-color="#1A2824"
				style:border-color="#2C4D43"
				style:transform="translateX({featureBoxScroll + (window?.innerHeight ?? 0) / 2 - (window?.innerWidth < 1280 ? 600 : 0) > 0 ? 0 : "200%"})"
			>
				<div class="w-full h-3/4 p-3 sm:p-6">
					<video
						class="size-full object-cover"
						autoplay
						loop
						playsinline
						muted
					>
						<source src={image('games/chameleon/features_2.webm')} type="video/webm" />
					</video>
				</div>
				<div class="relative w-full h-1/4 flex items-center gap-3 sm:gap-4">
					<div class="w-4 h-5/6 ml-4 sm:ml-8 rounded-3xl -translate-y-2 sm:-translate-y-3" style:background="linear-gradient(0deg, rgba(53,165,113,1) 0%, rgba(80,138,154,1) 100%)"></div>
					<div class="h-full flex flex-col gap-2 sm:gap-4 mr-2">
						<div class="{lang == 'en'
						? 'text-2xl sm:text-3xl lg:text-4xl'
						: 'text-xl sm:text-2xl lg:text-3xl'}" style:color="#88DED4">{m.procedural_generation()}</div>
						<div class="{lang == 'en'
						? 'text-xl sm:text-2xl lg:text-2xl leading-6 sm:leading-7'
						: 'text-md sm:text-lg lg:text-xl leading-6 sm:leading-7'}" style:color="#809B99">{m.procedural_generation_description()}</div>
					</div>
				</div>
			</div>
		</div>

		{/* FEATURES BACKGROUND */ null}
		<div class="absolute w-full h-screen top-0" style:transform="translateY({Math.max(0, featureBoxScroll)}px)">
			<Grid />
		</div>

		{/* DEVICE */ null}
		<div class="fixed pointer-events-none w-full h-screen z-40 top-0 hidden xl:block transition-transform duration-700" style:transform="translateY({Math.abs(featureBoxScroll) < window.innerHeight/2 ? 0 : 50}%)">
			<img
				class="absolute center-x bottom-0 w-2/3 h-2/3 object-contain"
				src={image(`games/chameleon/device/${deviceImgIndex}.webp`)}
				alt="device"
			/>
		</div>

		<div class="fade w-full h-[10vh] sm:h-[20vh] z-20 absolute bottom-0" style:background="linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)"></div>
	</div> 
	{/* MONSTER SECTION */ null}
	<div class="relative w-full min-h-screen bg-black overflow-hidden h-[1380px] md:h-[1500px]" bind:this={monsterSection}>
		<img
			class="absolute transition-opacity duration-1000 object-cover top-[100px] right-0 h-[300px] md:h-[400px]" src={image('games/chameleon/monster_1.webp')} 
			class:opacity-0={monsterSectionScroll + (window?.innerHeight ?? 0) / 2 > 0 ? false : true}
			alt="monster concept art" 
		/>
		<div
			class="absolute bg-black lg:bg-transparent transition-opacity duration-1000 top-[200px] left-12 sm:left-[100px] xl:left-[unset] xl:right-[600px] 2xl:right-[800px] sm:w-[500px] {lang == 'en'
				? 'text-2xl sm:text-3xl lg:text-[2.25rem]'
				: 'text-xl sm:text-2xl lg:text-[1.875rem]'}"
			class:opacity-0={monsterSectionScroll + (window?.innerHeight ?? 0) / 2 + 100  > 0 ? false : true}
			style:transform="translateY({-(monsterSectionScroll)/3}px)"
			style:color="#7C7C7C"
		>{m.monster_lore_a()}</div>
		<img
			class="absolute transition-opacity duration-1000 object-cover top-[450px] left-[-10px] h-[400px] md:h-[500px]"
			class:opacity-0={monsterSectionScroll + (window?.innerHeight ?? 0) / 2 > 450 ? false : true}
			style:transform="translateY({-(monsterSectionScroll - 400)/3.6}px)"
			src={image('games/chameleon/monster_2.webp')}
			alt="monster sighting 1"
			/>
		<div
			class="absolute bg-black lg:bg-transparent transition-opacity duration-1000 top-[650px] right-12 sm:right-[100px] xl:right-[unset] xl:left-[800px] sm:w-[350px] {lang == 'en'
				? 'text-2xl sm:text-[1.8rem] lg:text-[2rem]'
				: 'text-xl sm:text-2xl lg:text-[1.8rem]'}"
			class:opacity-0={monsterSectionScroll + (window?.innerHeight ?? 0) / 2 > 500 ? false : true}
			style:color="#7C7C7C"
		>{m.monster_lore_b()}</div>
		<img
			class="absolute transition-opacity duration-1000 object-cover top-[900px] -right-8 md:left-1/2 md:-translate-x-1/4 h-[230px] md:h-[300px]"
			class:opacity-0={monsterSectionScroll + (window?.innerHeight ?? 0) / 2 > 830 ? false : true}
			src={image('games/chameleon/monster_3.webp')}
			alt="monster sighting 2"
			/>
		<div
			class="absolute bg-black lg:bg-transparent transition-opacity duration-1000 top-[950px] left-12 xl:left-[unset] xl:right-[580px] 2xl:right-[700px] md:w-[650px] {lang == 'en'
				? 'text-2xl sm:text-3xl lg:text-[2.5rem]'
				: 'text-xl sm:text-2xl lg:text-[2rem]'}"
			class:opacity-0={monsterSectionScroll + (window?.innerHeight ?? 0) / 2 > 650 ? false : true}
			style:transform="translateY({-(monsterSectionScroll-650)/2}px)"
			style:color="#7C7C7C"
		>{m.monster_lore_c()}</div>
		<div
			class="absolute bg-black transition-opacity duration-1000 top-[1200px] md:top-[1350px] center-x text-nowrap {lang == 'en'
				? 'text-3xl sm:text-4xl lg:text-5xl'
				: 'text-2xl sm:text-3xl lg:text-4xl'}"
			class:opacity-0={monsterSectionScroll + (window?.innerHeight ?? 0) / 2 > 1150 ? false : true}
			style:transform="translate(-50%,{-(monsterSectionScroll - 900)/1.6}px)"
			style:color="#7C7C7C"
		>{m.monster_lore_d()}</div>

		<div class="absolute top-0 w-full h-full pointer-events-none">
			<video
			class="absolute top-1/2 left-0 md:w-1/2 h-1/2 object-contain"
			bind:this={runVideo}
			autoplay
			loop
			playsinline
			muted>
				<source src={image('games/chameleon/run.webm')} type="video/webm" />
			</video>
		</div>
	</div>

	{/* JUMPSCARE SECTION */ null}
	<div class="relative w-full h-screen bg-black">
			<video
			bind:this={jumpscareVideo}
			class="size-full object-cover"
			muted
			playsinline
			onended={() => {
					window.scrollTo(0, scroll = featureBox.offsetTop);
					jumpscareVideo.pause();
					jumpscareVideo.currentTime = 0;
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
