<script>
    import { isaObj } from '@/stores/isa.js';
    import { partialview } from '@/stores/partialview';

    let value;
    let component;

    partialview.subscribe($ => {
        component = $.component;
        if ($.path !== '') {
            value = isaObj.keyed($.path);
        } else {
            value = isaObj;
        }
    });

</script>


<section>
    
    {#if value}
    <svelte:component this={component} bind:value={$value} />
    {/if}

</section>


<style>

</style>