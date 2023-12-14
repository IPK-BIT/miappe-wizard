<script>
    export let label = '';
    export let attr;
    let date;
    export { date as value };

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
        if ($appstate==appstate.WIZARD){
            el.focus();
        }
    }

</script>


<section>

    <div class="attr"><label>{label}:</label> <input use:explanationAction use:setFocus data-attr={attr} class="datepicker" type="date" bind:value={date} /></div>

</section>


<style>
.datepicker {
    padding: 4px;
    font-family: sans-serif;
    font-size: 100%;
}
</style>