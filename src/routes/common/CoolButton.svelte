<script>
    let { normalColor, hoverColor, onclick, children } = $props();

    let hovering = $state(false);
    let backComponent = null;
</script>


<button
    class="relative flex h-fit justify-center items-center rounded-xl text-white overflow-hidden"
    class:hovering={hovering}
     style:color={hoverColor}
    onmouseenter={() => hovering = true}
    onmouseleave={() => hovering = false}
    onclick={onclick}
>
{@render children()}
<div class="absolute w-full h-full rounded-xl p-[1px] -z-20">
    <div class="relative w-full h-full rounded-xl" style:background-color={normalColor}></div>
</div>
<div class="absolute w-full pb-[100%] transition-transform duration-500 rounded-full -z-10 {hovering ? "scale-105" : "scale-0"}" bind:this={backComponent} style:background-color={hoverColor}></div>
</button>
