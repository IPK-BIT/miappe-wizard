<script>
    export let attr;
    export let value;

    import { explanationActionFactory } from '@/actions/explanation.js';
    import { getContext } from 'svelte';
    const isaLevel = getContext('isaLevel');

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let explanationAction = explanationActionFactory(isaLevel);

    function setFocus(el){
        el.focus();
    }

</script>


<section>

    <div class="attr"><label>{attr}:</label> <input use:explanationAction use:setFocus data-attr={attr} type="text" bind:value={value} /></div> <!--  on:keypress={handleKeypress}  -->

</section>


<style>
    input {
        padding: 4px;
        font-family: sans-serif;
        font-size: 100%;
    }
</style>