<script>
	import { gotoPage, image } from "$lib/utils";
    import * as m from '$lib/paraglide/messages.js';
	import HorizontalLine from "../common/HorizontalLine.svelte";
	import { onMount } from "svelte";
	import ArrowDown from "../common/ArrowDown.svelte";
	import VerticalLine from "../common/VerticalLine.svelte";
	import BackIcon from "../common/BackIcon.svelte";

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
    let conceptArtBox;
    //@ts-ignore
    let conceptArtScroll = $derived(scroll - conceptArtBox?.offsetTop);
</script>

<div class="w-full">
    {/* BANNER SECTION */ null}
    <div class="banner w-full h-screen" style="clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); clip-path: fill-box;">
        {/* BANNER BACKGROUND */ null}
        <div
            class="banner-art w-full xl:w-2/3 fixed right-0 h-full"
            style:transform="translateY(-{scroll/4}px)"
        >
            <img 
                class="absolute center-y object-cover xl:object-contain h-full"
                src={image('games/pivot/banner_art.png')}
                alt="banner art"
            />
            
        </div>
        <div class="placeholder size-full" style:background-color="#030708">
            <button
                class="absolute left-8 top-32 min-[400px]:top-10 z-30 sm:left-20 sm:top-20 lg:left-28"
                onclick={() => gotoPage('game')}
            >
                <BackIcon color="#DFDDF9" class="size-6 sm:size-10" />
            </button>
            {/* BANNER TEXT */ null}
            <div class="banner-text flex flex-col items-center absolute w-5/6 sm:w-1/2 xl:w-1/3 gap-7 bottom-1/4 xl:bottom-[30%] center-x xl:left-28 xl:translate-x-0 z-20">
                <img
                    class="w-full"
                    src={image('games/pivot/pivot_logo.png')}
                    alt="logo"
                />
                <HorizontalLine stroke="#649B9F" strokeWidth="2" width="90%" class="xl:translate-x-4"/>
                <div class="w-8/12 font-jersey text-2xl lg:text-[1.6rem] leading-6 xl:translate-x-8" style:color="#649B9F">“{m.pivot_description()}”</div>
                <HorizontalLine stroke="#649B9F" strokeWidth="2" width="90%" class="xl:translate-x-20" />
                <button type="button" class="xl:translate-x-24" onclick={() => { window.scrollTo(0, window.innerHeight); }}>
                    <ArrowDown stroke="#A46B6C" class="size-16"/>
                </button>
            </div>
        </div>
        <div class="fade size-full z-10 absolute top-0 left-0 hidden xl:block" style:background="linear-gradient(0deg, rgba(3,7,8,1) 0%, rgba(3,7,8,0) 25%)"></div>
        <div class="fade size-full z-10 absolute top-0 left-0 block xl:hidden" style:background="linear-gradient(0deg, rgba(3,7,8,1) 0%, rgba(3,7,8,0) 70%)"></div>
    </div>

    {/* GAMEPLAY SECTION */ null}
    <div class="relative w-full pt-12 pb-20" style:background-color="rgba(41,99,80,0.13)">
        {/* GAMEPLAY TITLE */ null}
        <div class="title-box h-20 lg:h-28">
            <div class="flex justify-between h-full pb-12">
                <svg
                    viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
                    class="translate-y-5 w-20 md:w-32 xl:w-64 h-12 md:h-20 xl:h-24"
                >
                    <line x1="0" y1="6" x2="100" y2="6" stroke="#649B9F" stroke-width="6"/>
                    <line x1="0" y1="50" x2="80" y2="50" stroke="#649B9F" stroke-width="6"/>
                    <line x1="0" y1="94" x2="60" y2="94" stroke="#649B9F" stroke-width="6"/>
                </svg>
                <div class="flex h-full gap-4 md:gap-6 xl:gap-8 items-center">
                    <VerticalLine stroke="#649B9F" strokeWidth="2" height="100%" class="w-1 lg:w-[6px]" />
                    <div class="font-jersey text-4xl md:text-6xl lg:text-8xl leading-6" style:color="#649B9F">GAMEPLAY</div>
                    <VerticalLine stroke="#649B9F" strokeWidth="6" height="100%" class="w-1 lg:w-[6px]" />
                </div>
                <svg
                    viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
                    class="translate-y-5 w-20 md:w-32 xl:w-64 h-12 md:h-20 xl:h-24"
                    >
                    <line x1="0" y1="6" x2="100" y2="6" stroke="#649B9F" stroke-width="6"/>
                    <line x1="20" y1="50" x2="100" y2="50" stroke="#649B9F" stroke-width="6"/>
                    <line x1="40" y1="94" x2="100" y2="94" stroke="#649B9F" stroke-width="6"/>
                </svg>
            </div>
        </div>
        {/* GAMEPLAY VIDEO */ null}
        <div class="video-box relative w-3/4 md:w-2/3 center-x">
            <div class="relative w-full pt-[56.25%]">
                <iframe
                    title="pivot gameplay"
                    class="absolute bottom-0 left-0 right-0 top-0 size-full rounded-md sm:rounded-xl xl:rounded-3xl"
                    height="1080"
                    width="1920"
                    frameborder="0"
                    src="https://www.youtube.com/embed/cNu3ARoF3js?vq=hd720p;feature=oembed&amp;hd=1&amp;modestbranding=1&amp;autohide=1&amp;showinfo=0&&amp;autoplay=0"
                    allow="autoplay; encrypted-media" allowfullscreen
                ></iframe>
            </div>
        </div>

        <div class="fade size-full z-10 absolute top-0 left-0 pointer-events-none" style:background="linear-gradient(0deg, rgba(72,165,181,0.2) 0%, rgba(72,165,181,0) 25%)"></div>
    </div>

    <div class="w-full h-4 xl:h-8 bg-white"></div>

    {/* CONCEPT ARTS SECTION */ null}
    <div
    class="flex flex-col gap-28 pt-14 pb-28 sm:py-0 sm:block relative w-full overflow-x-hidden bg-attachment-fixed sm:h-[1700px] xl:h-[1300px]"
    style:background="linear-gradient(0deg, #7CBCBE 0%, #649B9F 100%)"
    style="-webkit-clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); clip-path: padding-box;"
    bind:this={conceptArtBox}
    >
        {/* CONCEPT ARTS TITLE */ null}
        <div class="fixed z-10 center-xy select-none" style:filter="drop-shadow(0px 4px 0 rgb(74, 74, 74))">
            <div class="relative" style:transform="translateY({-conceptArtScroll/10}px)">
                <div class="font-jersey text-4xl md:text-6xl lg:text-8xl leading-6 text-white text-center">CONCEPT<br />ARTS</div>
                <HorizontalLine stroke="#ffffff" strokeWidth="4" width="100%" class="translate-y-4" />
            </div>
        </div>

        {/* POKER DOTS */ null}
        <div class="absolute top-14 right-28 w-48 pointer-events-none">
            <img
                class="w-full"
                src={image('games/pivot/dots.png')}
                alt="poker dots"
            />
        </div>
        
        {/* WEAPON */ null}
        <div class="relative sm:absolute center-x sm:translate-x-0 sm:left-28 w-10/12 sm:w-[400px] sm:top-8">
            <img
                class="w-full rounded-xl"
                src={image('games/pivot/axe_concept.png')}
                alt="weapon"
            />
            <div class="absolute rounded-xl w-[600px] h-[200px] bottom-16 -left-32 -z-10" style:background-color="#A2D7D2"></div>
            <div class="absolute font-jersey text-white text-2xl sm:text-3xl left-3 -bottom-12">= Player Axe Weapon Design</div>
        </div>

        {/* BACKGROUND */ null}
        <div class="relative sm:absolute center-x sm:translate-x-0 sm:left-auto sm:right-6 w-10/12 sm:w-[640px] sm:top-[500px] xl:top-[344px]">
            <img
                class="w-full rounded-xl"
                src={image('games/pivot/cave_concept.png')}
                alt="background"
            />
            <div class="absolute rounded-xl w-[800px] h-[100px] bottom-12 -right-14 -z-10" style:background-color="#A2D7D2"></div>
            <div class="absolute font-jersey text-white text-2xl sm:text-3xl right-6 -bottom-12">= Cave Background Concept</div>
        </div>

        {/* ANIMATION */ null}
        <div class="relative sm:absolute center-x sm:translate-x-0 sm:left-48 w-10/12 sm:w-[400px] sm:top-[910px] sm:xl:top-[650px]">
            <video
                class="w-full rounded-xl"
                autoplay
                loop
                muted
                playsinline
            >
            <source type="video/mp4" src={image('games/pivot/animation_concept.mp4')} />
            </video>
            <div class="absolute rounded-xl w-[640px] h-[200px] bottom-16 -left-52 -z-10" style:background-color="#A2D7D2"></div>
            <div class="absolute font-jersey text-white text-2xl sm:text-3xl left-3 -bottom-12">= Monster Draft Animation</div>
        </div>

        {/* MONSTER */ null}
        <div class="relative sm:absolute center-x sm:translate-x-0 sm:left-auto sm:right-14 w-10/12 sm:w-[500px] sm:top-[1380px] xl:top-[900px]">
            <img
                class="w-full rounded-xl"
                src={image('games/pivot/monster_concept.png')}
                alt="monster"
            />
            <div class="absolute rounded-xl w-[800px] h-[100px] bottom-12 -right-20 -z-10" style:background-color="#A2D7D2"></div>
            <div class="absolute font-jersey text-white text-2xl sm:text-3xl right-6 -bottom-12">= Monster Design Concept</div>
        </div>
    </div>
</div>