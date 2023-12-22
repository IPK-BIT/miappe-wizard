<script>
    export let label = '';
    export let attr;
    export let value;
    export let showLabel = true;
    export let focus = false;

    if (!label) {
        label = attr;
    }

    import { explanationActionFactory } from '@/actions/explanation.js';
    import { appstate } from '@/stores/appstate';
    import { getContext } from 'svelte';
    const isaLevel = getContext('isaLevel');

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

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
        <textarea class:wide={!showLabel} use:explanationAction use:setFocus data-attr={attr} bind:value={value} on:change></textarea>
    </div>

</section>


<style>
    label {
        vertical-align: top;
    }
    textarea {
        /*padding: 4px;*/
        font-family: sans-serif;
        font-size: 120%;
        width: 500px;
        height: 8em;
        padding: 10px;
        font-size: 1.1em;
    }

    .wide {
        width: 100%;
    }
</style>