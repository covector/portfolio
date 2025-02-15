<script>
	import { animationData } from '$lib/animation_data';
	import { getContext, onMount } from 'svelte';
	import PlayVideo from './PlayVideo.svelte';
	import { mobileAndTabletCheck } from '$lib/utils';
	import * as m from '$lib/paraglide/messages.js';
	import ArrowDown from '../common/svg/ArrowDown.svelte';
	import BackIcon from '../common/svg/BackIcon.svelte';

	const ANIMATION_SCROLL_HEIGHT = 1000;
	const totalHeight = $derived(
		typeof window != 'undefined'
			? ANIMATION_SCROLL_HEIGHT * (animationData.length - 0.5) + window.innerHeight
			: 0
	);
	let scroll = $state(0);

	let isMobile = $state(false);
	onMount(() => {
		isMobile = mobileAndTabletCheck();
	});

	const domain = $derived(getContext('domain').current);
	$effect(() => {
		if (domain === 'animation') {
			window.scrollTo(0, scroll);
		}
	});

	/**
	 * @param {number} t current value
	 * @param {number} start start of range
	 * @param {number} end end of range
	 * @param {number} low start of new range
	 * @param {number} high end of new range
	 */
	function Relu6Map(t, start, end, low, high) {
		if (t <= start) {
			return low;
		}
		if (t >= end) {
			return high;
		}
		return ((t - start) / (end - start)) * (high - low) + low;
	}
	/**
	 * @param {number} t current value
	 * @param {number} start start of range
	 * @param {number} end end of range
	 * @param {number} low below range value
	 * @param {number} med in range value
	 * @param {number} high above range value
	 */
	function StepMap(t, start, end, low, med, high) {
		if (t < start) {
			return low;
		}
		if (t >= end) {
			return high;
		}
		return med;
	}
	/**
	 * @param {number} t current value
	 * @param {number} start start of range
	 * @param {number} end end of range
	 */
	function transformMap(t, start, end) {
		let height = getContext('size').height;
		return height <= 0 ? 2000 : StepMap(t, start, end, height, 0, -height);
	}
	/**
	 * @param {number} t current value
	 * @param {number} start start of range
	 * @param {number} end end of range
	 */
	function frontCardMap(t, start, end) {
		if (isMobile) {
			return 50;
		}
		return Relu6Map(t, start, end, 55, 45);
	}
	/**
	 * @param {number} t current value
	 * @param {number} start start of range
	 * @param {number} end end of range
	 */
	function backCardMap(t, start, end) {
		if (isMobile) {
			return -1;
		}
		return Relu6Map(t, start, end, -4, 2);
	}
	/**
	 * @param {number} t current value
	 * @param {number} start start of range
	 * @param {number} end end of range
	 */
	function dateTextMap(t, start, end) {
		const isPhone = getContext('size').width <= 640;
		const isTablet = getContext('size').width <= 768;
		if (isPhone) {
			if (isMobile) {
				return 20;
			}
			return Relu6Map(t, start, end, 25, 15);
		} else if (isTablet) {
			if (isMobile) {
				return 13;
			}
			return Relu6Map(t, start, end, 18, 8);
		} else {
			if (isMobile) {
				return 50;
			}
			return Relu6Map(t, start, end, 60, 40);
		}
	}
	/**
	 * @param {number} t current value
	 * @param {number} start start of range
	 * @param {number} end end of range
	 */
	function isVisible(t, start, end) {
		return t >= start && t < end;
	}

	/** @param {Event} e */
	function onScroll(e) {
		if (domain !== 'animation') {
			return;
		}
		if (isMobile) {
			window.scrollTo(0, mobileScroll);
		} else {
			scroll = window.scrollY;
		}
	}
	onMount(() => {
		window.addEventListener('scroll', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	});

	// mobile custom scroll
	onMount(() => {
		if (mobileAndTabletCheck()) {
			window.addEventListener('touchstart', handleTouchStart);
			window.addEventListener('touchmove', handleTouchMove, { passive: false });
			window.addEventListener('touchend', handleTouchEnd);
		}
		return () => {
			window.removeEventListener('touchstart', handleTouchStart);
			window.removeEventListener('touchmove', handleTouchMove);
			window.removeEventListener('touchend', handleTouchEnd);
		};
	});
	/** @type {number|null}*/
	let yDown = $state(null);
	/** @type {number|null}*/
	let yUp = $state(null);
	/** @type {number} */
	let mobileViewingIndex = $state(0);
	let mobileScroll = $derived(
		mobileViewingIndex == 0 ? 0 : (mobileViewingIndex + 0.5) * ANIMATION_SCROLL_HEIGHT
	);
	/** @param {TouchEvent} e*/
	function handleTouchStart(e) {
		if (domain !== 'animation') {
			return;
		}
		// @ts-ignore
		const firstTouch = (e.touches || e.originalEvent?.touches)[0];
		yDown = firstTouch.clientY;
	}
	/** @param {TouchEvent} e*/
	function handleTouchMove(e) {
		if (domain !== 'animation') {
			return;
		}
		// e.preventDefault();
		// e.stopPropagation();
		// @ts-ignore
		const lastTouch = (e.touches || e.originalEvent?.touches)[0];
		yUp = lastTouch.clientY;
	}
	/** @param {TouchEvent} e*/
	function handleTouchEnd(e) {
		if (domain !== 'animation') {
			return;
		}
		if (yDown && yUp) {
			if (yDown - yUp > 100 && mobileViewingIndex < animationData.length - 1) {
				mobileViewingIndex++;
			} else if (yUp - yDown > 100 && mobileViewingIndex > 0) {
				mobileViewingIndex--;
			}
			scroll = mobileScroll;
		}
		yDown = null;
		yUp = null;
	}

	/**
	 * @param {Date} date
	 */
	function formatDate(date) {
		let str = date.getFullYear() + '・' + (date.getMonth() + 1) + '・' + date.getDate();
		return str.replace(/[0-9]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) + 65248));
	}

	/**
	 * @param {number} x number
	 */
	function even(x) {
		return x % 2 === 0;
	}

	let lowScroll = $derived(
		isMobile ? mobileViewingIndex < 2 : scroll < ANIMATION_SCROLL_HEIGHT * 2
	);
	let maxScroll = $derived(
		isMobile
			? mobileViewingIndex > animationData.length - 2
			: scroll > ANIMATION_SCROLL_HEIGHT * (animationData.length - 1) - 10
	);
	let knowScroll = $state(false);
	$effect(() => {
		if (!lowScroll && !knowScroll) {
			knowScroll = true;
		}
	});
</script>

<div class="overflow-scroll-y h-screen w-full" style:height={totalHeight + 'px'}>
	{/* SCROLL TIP */ null}
	<!-- {#if !knowScroll && lowScroll} -->
	{#if !maxScroll}
		<div class="center-x fixed bottom-4 z-40 flex flex-col items-center gap-2 text-center">
			<div class="select-none" style:color="#C4C4C4">{m.scroll()}</div>
			<button
				onclick={(e) => {
					e.stopPropagation();
					if (isMobile) {
						mobileViewingIndex++;
						scroll = mobileScroll;
					} else {
						window.scrollTo(0, (scroll += ANIMATION_SCROLL_HEIGHT));
					}
				}}
				class="animate-bounce rounded-full bg-white p-1 shadow-md"
			>
				<ArrowDown class="relative h-6 w-6" stroke="#C4C4C4" strokeWidth="6" />
			</button>
		</div>
	{/if}

	{/* BACK TO TOP */ null}
	{#if maxScroll}
		<button
			class="center-x fixed bottom-4 z-40 flex flex-col items-center gap-1 text-center"
			onclick={() => {
				isMobile ? (scroll = mobileViewingIndex = 0) : window.scrollTo(0, (scroll = 0));
			}}
		>
			<BackIcon class="relative h-6 w-6 rotate-90" color="#C4C4C4" />
			<div class="select-none" style:color="#C4C4C4">{m.back_to_top()}</div>
		</button>
	{/if}

	{/* ANIMATION CARDS */ null}
	{#each animationData as data, i (i)}
		<div
			class={'card fixed right-[4.166667%] w-11/12 transition-transform duration-500 ease-[cubic-bezier(.77,0,.33,1)] sm:w-5/6 md:w-3/5' +
				(even(i) ? ' md:right-28' : ' md:left-36')}
			style:transform={`translateY(${transformMap(scroll, i * ANIMATION_SCROLL_HEIGHT, (i + 1) * ANIMATION_SCROLL_HEIGHT)}px)`}
			style:top={frontCardMap(
				scroll,
				i * ANIMATION_SCROLL_HEIGHT,
				(i + 1) * ANIMATION_SCROLL_HEIGHT
			) + 'vh'}
			class:hidden={i == 0
				? scroll > (i + 2) * ANIMATION_SCROLL_HEIGHT && !maxScroll
				: scroll < (i - 1) * ANIMATION_SCROLL_HEIGHT || scroll > (i + 2) * ANIMATION_SCROLL_HEIGHT}
		>
			<div
				style:transform={`translateY(${scroll == 0 || scroll == totalHeight - window.innerHeight ? getContext('overscroll').current : 0}px)`}
			>
				<div
					class="video-wrap max-w-full -translate-y-1/2 rounded-2xl"
					style:width="max-content"
					style:--translate-y={backCardMap(
						scroll,
						i * ANIMATION_SCROLL_HEIGHT,
						(i + 1) * ANIMATION_SCROLL_HEIGHT
					) + 'vh'}
				>
					<PlayVideo
						class="animation-vid size-auto rounded-2xl"
						loop
						muted
						playsinline
						play={scroll <= 0
							? true
							: isVisible(scroll, i * ANIMATION_SCROLL_HEIGHT, (i + 1) * ANIMATION_SCROLL_HEIGHT)}
						uri={data.uri}
						alt={data.name}
					/>
				</div>
			</div>
		</div>
		<div
			class={'fixed select-none text-xs transition-transform duration-700 ease-[cubic-bezier(.7,0,.4,1)] lg:text-base' +
				(even(i) ? ' right-1/2 md:right-3/4' : ' right-1/2 md:right-[20%]')}
			style:transform={`translateY(${transformMap(scroll, i * ANIMATION_SCROLL_HEIGHT, (i + 1) * ANIMATION_SCROLL_HEIGHT)}px)`}
			style:top={dateTextMap(
				scroll,
				i * ANIMATION_SCROLL_HEIGHT,
				(i + 1) * ANIMATION_SCROLL_HEIGHT
			) + 'vh'}
			style:color="#404040"
		>
			<div
				style:transform={getContext('size').width <= 768
					? 'translate(50%, -50%)'
					: even(i)
						? 'translate(-10%, -50%)'
						: 'translate(100%, -50%)'}
			>
				{formatDate(data.date)}
			</div>
		</div>
	{/each}
</div>

<style>
	.video-wrap::before {
		content: '';
		display: block;
		top: 0;
		left: 0;
		width: 110%;
		height: 105%;
		transform: translate(-2%, var(--translate-y, -1%));
		position: absolute;
		border-radius: 1.5rem;
		box-shadow: 0 4px 7px rgba(0, 0, 0, 0.04);
		z-index: -1;
		background: linear-gradient(132deg, rgba(253, 253, 253, 1) 0%, rgba(253, 245, 255, 1) 100%);
	}

	:global(.animation-vid) {
		max-height: 70vh;
		clip-path: fill-box;
	}
</style>
