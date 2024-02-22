<script>
    export let label = '';
    export let isaLevel = null;
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


<section style="border: 0px solid black;">

    <div class="attr pure-g v-center">
        <div class="pure-u-5-24">
            {#if showLabel}
            <label>{label}</label>
            {/if}
        </div>
        <div class="pure-u-19-24">
            <input style="width: 100%;" class:wide={!showLabel} use:explanationAction use:setFocus data-isaLevel={isaLevel} data-attr={attr} type="text" bind:value={value} on:change />
        </div>
    </div>

    <!--
    <div class="attr">
        {#if showLabel}
        <label>{label}:</label>
        {/if}
        <input class:wide={!showLabel} use:explanationAction use:setFocus data-isaLevel={isaLevel} data-attr={attr} type="text" bind:value={value} on:change />
    </div>
    -->

</section>


<style>
    input {
        /*padding: 4px;*/
        /*font-family: sans-serif;
        font-size: 120%;*/
        width: 500px;
    }

    .wide {
        width: 100%;
    }
</style>