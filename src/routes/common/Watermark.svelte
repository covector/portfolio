<script>
    import { DOMAINS } from '$lib/domain.js';
	import { getContext } from 'svelte';
    /** @typedef {import("$lib/domain.js").Domain} Domain */

    /** @type {{current: Domain}} */
    const domainContext = getContext('domain');
	const domain = $derived(domainContext.current || DOMAINS[0]);

    /** @type {Record<Domain, string>} */
	const color = {
		game: '#8B83F5',
		animation: '#DB6CD0'
	};
</script>

<div
    class="h-full flex flex-col justify-between select-none transition-colors duration-1000"
    style:--watermark-color={color[domain]}
    >

<svg width="92" height="147" viewBox="0 0 92 147" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 147C1.5 118 1.5 56.7 1.5 43.5C1.5 13.5 18 1.5 43.5 1.5C63.9 1.5 70.8333 1.5 92 1.5" stroke-width="3"/>
</svg>
        
<div
    style:letter-spacing="0.5em"
    style:writing-mode="vertical-lr"
    style:color={color[domain]}
>
    CHAN CHEUK KIN
</div>

<svg width="3" height="125" viewBox="0 0 3 125" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="1.5" y1="6.55671e-08" x2="1.49999" y2="125" stroke-width="3"/>
    </svg>
    
</div>

<style>
    line, path {
        stroke: var(--watermark-color);
    }
    div {
        color: var(--watermark-color);
    }
</style>