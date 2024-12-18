<script>
    import { animationData } from "$lib/animation_data";
	import { lerp, progressIn } from "$lib/utils";
	import { onMount } from "svelte";

    const totalHeight = animationData.length * 1500;
    let pixel = $state(1000);

    /** 
     * @param {number} t current value
     * @param {number} a start of range
     * @param {number} b end of range
     * @param {number} c start of new range
     * @param {number} d end of new range
     * @param {number} a_f return value when t < a
     * @param {number} b_f return value when t > b
    */
    function cardMap(t, a, b, c, d, a_f, b_f) {
        if (t < a) { return a_f; }
        if (t > b) { return b_f; }
        return (t - a) / (b - a) * (d - c) + c;
    }
    function onScroll() {
        console.log(window.scrollY);
        pixel = cardMap(window.scrollY, 200, 500, 500, 100, 1000, -500);
    }
    onMount(() => {
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    });

</script>

<div
    class="w-full"
    style:height={totalHeight + "px"}
>
    <div
        class="fixed right-8 rounded-2xl h-2/5 w-3/5 bg-slate-400 ease-linear"
        style:transform={`translateY(${pixel}px)`}
    ></div>
</div>