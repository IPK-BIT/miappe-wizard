<script>
    export let attr;
    let date;
    export { date as value };

    import { explanationActionFactory } from '@/actions/explanation.js';
    import { getContext } from 'svelte';
    const isaLevel = getContext('isaLevel');

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let explanationAction = explanationActionFactory(isaLevel);

    function setFocus(el){
        el.focus();
    }

    function handleKeypress(event) {
        if (event.keyCode === 13) {
            dispatch('nextStep');
        }
    }

</script>


<section>

    <div class="attr"><label>{attr}:</label> <input use:explanationAction use:setFocus data-attr={attr} class="datepicker" type="date" bind:value={date} on:keypress={handleKeypress} /></div>

</section>


<style>
.datepicker {
    padding: 4px;
    font-family: sans-serif;
    font-size: 100%;
}
</style>