<script>
    export let label = '';
    export let attr;
    export let value;

    if (!label) {
        label = attr;
    }

    import { explanationActionFactory } from '@/actions/explanation.js';
    import { appstate } from '@/stores/appstate';
    import { getContext } from 'svelte';
    const isaLevel = getContext('isaLevel');

    let explanationAction = explanationActionFactory(isaLevel);

    function setFocus(el){
        if ($appstate == appstate.WIZARD){
            el.focus();
        }
    }

</script>


<section>

    <div class="attr"><label>{label}:</label> 
        <select use:explanationAction use:setFocus data-attr={attr} type="text" bind:value={value}>
            <option value="1.0">1.0</option>
            <option value="1.1">1.1</option>
        </select>
    </div>

</section>


<style>
    select {
        padding: 4px;
        font-family: sans-serif;
        font-size: 100%;
    }
</style>