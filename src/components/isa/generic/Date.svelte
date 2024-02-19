<script>
    export let label = '';
    export let isaLevel = null;
    export let attr;
    let date;
    export { date as value };
    export let showLabel = true;
    export let focus = false;

    if (!label) {
        label = attr;
    }

    import { explanationActionFactory } from '@/actions/explanation.js';
    import { appstate } from '@/stores/appstate';
    import { getContext } from 'svelte';

    if (!isaLevel) {
        isaLevel = getContext('isaLevel');
    }

    let explanationAction = explanationActionFactory(isaLevel);

    function setFocus(el){
        if ($appstate==appstate.WIZARD && focus){
            el.focus();
        }
    }

</script>


<section>

    <div class="attr">
        {#if showLabel}
        <label>{label}:</label>
        {/if}
        <input class:wide={!showLabel} use:explanationAction use:setFocus data-attr={attr} class="datepicker" type="date" bind:value={date} on:change />
    </div>

</section>


<style>
.datepicker {
    padding: 4px;
    font-family: sans-serif;
    font-size: 100%;
}
</style>