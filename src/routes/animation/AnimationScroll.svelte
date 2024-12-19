<script>
	import { animationData } from '$lib/animation_data';
	import { getContext, onMount } from 'svelte';
	import PlayVideo from './PlayVideo.svelte';
	import { mobileAndTabletCheck } from '$lib/utils';
	import { base } from "$app/paths";

	const ANIMATION_SCROLL_HEIGHT = 1000;
	const totalHeight = $derived(
		typeof window != 'undefined'
			? ANIMATION_SCROLL_HEIGHT * (animationData.length - 0.5) + window.innerHeight
			: 0
	);
	let scroll = $state(0);

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
		return Relu6Map(t, start, end, 55, 45);
	}
	/**
	 * @param {number} t current value
	 * @param {number} start start of range
	 * @param {number} end end of range
	 */
	function backCardMap(t, start, end) {
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
			return Relu6Map(t, start, end, 25, 15);
		} else if (isTablet) {
			return Relu6Map(t, start, end, 18, 8);
		} else {
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
		if (typeof window != 'undefined' && window.innerWidth <= 768) {
			return;
		}
		scroll = window.scrollY;
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
	/** @param {TouchEvent} e*/
	function handleTouchStart(e) {
		// @ts-ignore
		const firstTouch = (e.touches || e.originalEvent?.touches)[0];
		yDown = firstTouch.clientY;
	}
	/** @param {TouchEvent} e*/
	function handleTouchMove(e) {
		e.preventDefault();
		e.stopPropagation();
		// @ts-ignore
		const lastTouch = (e.touches || e.originalEvent?.touches)[0];
		yUp = lastTouch.clientY;
	}
	/** @param {TouchEvent} e*/
	function handleTouchEnd(e) {
		if (yDown && yUp) {
			if (yDown - yUp > 100 && mobileViewingIndex < animationData.length - 1) {
				mobileViewingIndex++;
			} else if (yUp - yDown > 100 && mobileViewingIndex > 0) {
				mobileViewingIndex--;
			}
			scroll = mobileViewingIndex * ANIMATION_SCROLL_HEIGHT;
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
</script>

<div class="min-h-screen w-full" style:height={totalHeight + 'px'}>
	{#each animationData as data, i (i)}
		<div
			class={'card fixed right-[4.166667%] w-11/12 transition-transform duration-500 ease-[cubic-bezier(.77,0,.33,1)] sm:w-5/6 md:w-3/5' +
				(even(i) ? ' md:right-28' : ' md:left-36')}
			style:transform={`translateY(${transformMap(scroll, i * ANIMATION_SCROLL_HEIGHT, (i + 1) * ANIMATION_SCROLL_HEIGHT)}px)`}
			style:top={frontCardMap(
				scroll,
				i * ANIMATION_SCROLL_HEIGHT,
				(i + 1) * ANIMATION_SCROLL_HEIGHT
			) + '%'}
		>
			<div
				class="video-wrap max-w-full -translate-y-1/2 rounded-2xl"
				style:width="max-content"
				style:--translate-y={backCardMap(
					scroll,
					i * ANIMATION_SCROLL_HEIGHT,
					(i + 1) * ANIMATION_SCROLL_HEIGHT
				) + '%'}
			>
				<PlayVideo
					class="animation-vid size-auto rounded-2xl"
					loop
					muted
					play={scroll <= 0
						? true
						: isVisible(scroll, i * ANIMATION_SCROLL_HEIGHT, (i + 1) * ANIMATION_SCROLL_HEIGHT)}
					uri="{base}/{data.uri}"
					alt={data.name}
				/>
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
			) + '%'}
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

	:global(::-webkit-scrollbar) {
		width: 10px;
	}

	:global(::-webkit-scrollbar-track) {
		background: #fae4ff;
	}

	:global(::-webkit-scrollbar-thumb) {
		background-color: #c76fdd;
		border-radius: 5px;
	}

	:global(::-webkit-scrollbar-thumb:hover) {
		background-color: #c05ea8;
	}
</style>
